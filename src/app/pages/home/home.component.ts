import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Competition} from "../../models/competition";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {CompetitionInfo} from "../../models/competition-info";
import {ClassesObj} from "../../models/classes";
import {Result, ResultsObj} from "../../models/results";
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected readonly top = top;
  public compList: string[] = [];
  public txtComp:string = '';
  public userList: string[] = [];
  public newId:number;
  public txtUser:string = ''
  public competitionsOrig: Competition[] = [];
  public competitions: Competition[] = [];

  public readonly todayDate = formatDate(new Date(),'yyyy-MM-dd','en');

  public competitionInfo: CompetitionInfo = new CompetitionInfo();
  public classesObj: ClassesObj = new ClassesObj();
  private firsStartMap = new Map<string,number>();
  public sendingStatus=false;
  protected readonly JSON = JSON;
  selectedIndex: number = 1;
  @ViewChild('tabs', { static: true }) tabsRef: ElementRef | undefined;

  constructor(private service:LiveHttpServiceService,
              private spinner:NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.compList = []
    this.userList = []
    console.log('init')

    if (!localStorage.getItem('compList')){
      localStorage.setItem('compList','DM,U10');
    }
    // @ts-ignore
    this.compList = localStorage.getItem('compList')?.split(',');

    if (localStorage.getItem('userList')){
      // @ts-ignore
      this.userList = localStorage.getItem('userList')?.split(',');
    }

    if (!this.userList.length){
      this.userList.push( 'Strängnäs');
    }
    this.txtUser = this.userList[0];
    console.log('xxx0')
    this.service.getCompetitions().subscribe( (response:object) => {
      console.log('xxx1')
      // @ts-ignore
      response.competitions.forEach( c => {
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
        if (new Date(c.date) > firstDayOfYear) {
          this.competitionsOrig.push(c);
        }
      });
      this.competitions = this.competitionsOrig;

    });

/*    if (localStorage.getItem('compId')){
      // @ts-ignore
      //let id:number = parseInt(localStorage.getItem('compId'));
      this.clickCompetition(id);
    }*/
    this.clickCompetition(29150);

  }

  clickCompetition(id:number) {
    localStorage.setItem('compId',id.toString());

      this.service.getCompetitionInfo(id).subscribe((response: CompetitionInfo) => {
        this.competitionInfo = response;
        if (this.txtUser) {
          this.getUserFilterResult(id);
          (document.getElementById('tab0') as HTMLElement).click();
        } else {

          this.classesObj = new ClassesObj();
        }
      });


  }

  ngAfterViewInit() {
    if (this.tabsRef) {
      const tabs = this.tabsRef.nativeElement;
      tabs.addEventListener('tdsChange', (event: any) => {
        const selectedTabIndex = event.detail.selectedTabIndex;
        this.selectedIndex = selectedTabIndex;
        console.log(this.selectedIndex);
      });


    }
  }

  submitFormComp() {
    this.compList.push(this.txtComp);
    localStorage.setItem('compList',this.compList.toString())
  }

  doFilterComp() {
    this.competitions = this.competitionsOrig.filter( c => c.name.includes(this.txtComp));
  }

  selectFilterComp(value:string) {
    this.txtComp = value;
    this.doFilterComp();
    (document.getElementById('tab1') as HTMLElement).click();
  }

  backUser() {
    this.userList.pop();
    localStorage.setItem('userList',this.userList.toString())
    if (!this.userList.length) {
       //this.getUserFilterResult(this.competitionInfo.id)
      this.txtUser = '';
      this.classesObj = new ClassesObj();
    }
  }
  backComp() {
    this.compList.pop();
    localStorage.setItem('compList',this.compList.toString());
  }

  allUser(){
    this.txtUser='';
    this.getUserFilterResult(this.competitionInfo.id)
  }
  clearUser(){
    if (!this.txtUser) {
      this.classesObj = new ClassesObj();
    }
  }

  submitFormUser() {
    console.log(this.txtUser);
    this.userList.push(this.txtUser);
    localStorage.setItem('userList',this.userList.toString())
    this.getUserFilterResult(this.competitionInfo.id);
  }

  submitFormNewId() {
    console.log(this.newId);
    this.clickCompetition(this.newId)

  }

  doReload() {
    this.getUserFilterResult(this.competitionInfo.id);
  }

  selectFilterUser(value:string) {
    this.txtUser = value;
    this.getUserFilterResult(this.competitionInfo.id);
    (document.getElementById('tab0') as HTMLElement).click();
  }

  toTimeString(start: number) {
     let h =  Math.floor(start/100/3600);
     let m = Math.floor((start-h*360000)/6000);
     let s = Math.floor((start-h*360000-m*6000)/100) ;
     return ''+h+':'+m.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0');
  }

  filterToday(comp: Competition[]) {
    return comp.filter( c => c.date === this.todayDate);
  }
  getUserFilterResult(id:number){
      if (this.sendingStatus){
        return;
      }
      this.service.getClasses(id).subscribe( (response:ClassesObj) => {
        this.classesObj = response;
        let lastClass =  this.classesObj.classes[this.classesObj.classes.length-1].className;
        this.sendingStatus = true;
        this.spinner.show();
        this.classesObj.classes.forEach( c => {
          this.service.getClassResults(this.competitionInfo.id,c.className).subscribe((response:ResultsObj) => {
            c._resultsObj = response;
            c._resultsObj._filteredResults = this.txtUser?c._resultsObj.results.filter(
              (r => r.name.includes(this.txtUser) || r.club.includes(this.txtUser) && !r.name.includes('vacant'))
              ):c._resultsObj.results;

            if (this.isRelay(c.className)){
              let classNumber:number = +c.className.charAt(c.className.length-1);
              if (classNumber==1) {
                console.log('fc ' + c.className.charAt(c.className.length-1))
                this.firsStartMap.set(c.className.substring(0,3), c._resultsObj.results[0].start);
              }
            }
            if (c._resultsObj.className === lastClass){
              this.sendingStatus = false;
              this.spinner.hide();
            }

          });
        });
      });
  }

  includeOldComp() {
    this.service.getCompetitions().subscribe( (response:object) => {
      // @ts-ignore
      response.competitions.forEach( c => {
          this.competitionsOrig.push(c);
      });
      this.competitions = this.competitionsOrig;
    });

  }

  isRelay(className:string):boolean{
    // @ts-ignore
    return this.competitionInfo.name.toLowerCase().includes('stafett') || (className.includes('-')&& !isNaN(+className.split('-').pop()?.substring(0,1)))
  }

  doTrunc(className: string) {
    if (this.isRelay(className)){
     return className.substring(0,4) + className.substring(className.indexOf('-'),className.length);
    } else {
      return className;
    }
  }

  printClub(club: string,className:string) {
    return this.isRelay(className)?club:'';
  }

  findLegResult(r: Result,className:string) {
    if (!this.isRelay(className)){
      return '';
    }
    // @ts-ignore
    return this.toTimeString(r.result- (r.start-this.firsStartMap.get(className.substring(0,3))))

  }


}
