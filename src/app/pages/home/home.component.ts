import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Competition} from "../../models/competition";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {CompetitionInfo} from "../../models/competition-info";
import {ClassesObj} from "../../models/classes";
import {Result, ResultsObj} from "../../models/results";



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
  public txtUser:string = ''
  public competitionsOrig: Competition[] = [];
  public competitions: Competition[] = [];

  public readonly todayDate = formatDate(new Date(),'yyyy-MM-dd','en');

  public competitionInfo: CompetitionInfo = new CompetitionInfo();
  public classesObj: ClassesObj = new ClassesObj();
  private compStart:number = 0;
  protected readonly JSON = JSON;
  selectedIndex: number = 0;
  @ViewChild('tabs', { static: true }) tabsRef: ElementRef | undefined;

  constructor(private service:LiveHttpServiceService) {
  }

  ngOnInit(): void {
    this.compList = []
    this.userList = []
    console.log('init')

    if (localStorage.getItem('compList')){
      // @ts-ignore
      this.compList = localStorage.getItem('compList')?.split(',');
    }
    if (localStorage.getItem('userList')){
      // @ts-ignore
      this.userList = localStorage.getItem('userList')?.split(',');
    }

    if (!this.userList.length){
      this.userList.push( 'Strängnäs');
    }
    this.txtUser = this.userList[0];

    this.service.getCompetitions().subscribe( (response:object) => {
      // @ts-ignore
      response.competitions.forEach( c => {
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
        if (new Date(c.date) > firstDayOfYear) {
          this.competitionsOrig.push(c);
        }
      });
      this.competitions = this.competitionsOrig;
    });

    if (localStorage.getItem('compId')){

      // @ts-ignore
      let id:number = parseInt(localStorage.getItem('compId'));
        this.clickCompetition(id);

    }
  }

  clickCompetition(id:number) {

    console.log(id)
    localStorage.setItem('compId',id.toString());

      this.service.getCompetitionInfo(id).subscribe((response: CompetitionInfo) => {
        this.competitionInfo = response;
        if (this.txtUser) {
          this.getUserFilterResult(id);
        } else {

          this.classesObj = new ClassesObj();
        }
      });

    (document.getElementById('tab0') as HTMLElement).click();
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

    this.service.getClasses(id).subscribe( (response:ClassesObj) => {
      this.classesObj = response;
      this.classesObj.classes.forEach( c => {
        this.service.getClassResults(this.competitionInfo.id,c.className).subscribe((response:ResultsObj) => {
          c._resultsObj = response;
          c._resultsObj._filteredResults = this.txtUser?c._resultsObj.results.filter(
            (r => r.name.includes(this.txtUser) || r.club.includes(this.txtUser) && !r.name.includes('vacant'))
            ):c._resultsObj.results;

          if (this.isRelay(c.className)){
            console.log('back ' + c.className)
            let classNumber:number = +c.className.charAt(c.className.length-1);
            if (classNumber==1) {
              this.compStart = c._resultsObj._filteredResults[0].start;
            }
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
    return this.competitionInfo.name.toLowerCase().includes('stafett') || className.includes('-')
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
    return this.toTimeString(r.result- (r.start-this.compStart))

  }
}
