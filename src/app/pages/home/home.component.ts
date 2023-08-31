import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Competition} from "../../models/competition";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {CompetitionInfo} from "../../models/competition-info";
import {ClassesObj} from "../../models/classes";
import {ResultsObj} from "../../models/results";



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

  protected readonly JSON = JSON;
  selectedIndex: number = 0;
  @ViewChild('tabs', { static: true }) tabsRef: ElementRef | undefined;

  constructor(private service:LiveHttpServiceService) {
  }


  ngOnInit(): void {
    this.compList = []
    this.userList = []
    console.log('init');
    if (localStorage.getItem('compList')){
      // @ts-ignore
      this.compList = localStorage.getItem('compList')?.split(',');
    }
    if (localStorage.getItem('userList')){
      // @ts-ignore
      this.userList = localStorage.getItem('userList')?.split(',');
    }
    if (this.userList){
      this.txtUser = this.userList[0];

    }
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
      console.log("xxx1")
      if (this.txtUser) {
        console.log("xxx2")
        this.clickCompetition(id);
      }
    }
  }

  clickCompetition(id:number) {
    console.log(id)
    localStorage.setItem('compId',id.toString());
    this.service.getCompetitionInfo(id).subscribe((response:CompetitionInfo) => {
      this.competitionInfo =  response;
      this.getUserFilterResult(id);
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
      this.txtUser='';
      this.getUserFilterResult(this.competitionInfo.id)
    }
  }
  backComp() {
    this.compList.pop();
    localStorage.setItem('compList',this.compList.toString());
  }

  clearFormUser(){
    this.txtUser='';
    this.getUserFilterResult(this.competitionInfo.id)
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

  filterToday(comp: Competition[]) {
    return comp.filter( c => c.date === this.todayDate);
  }

   toTimeString(start: number) {
     let h =  Math.floor(start/100/3600);
     let m = Math.floor((start-h*360000)/6000);
     let s = Math.floor((start-h*360000-m*6000)/100) ;
     return ''+h+':'+m.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0');
  }

  getUserFilterResult(id:number){
    //console.log("check again " + this.classesObj.status)
    this.service.getClasses(id).subscribe( (response:ClassesObj) => {
      this.classesObj = response;
      this.classesObj.classes.forEach( c => {
        this.service.getClassResults(this.competitionInfo.id,c.className).subscribe((response:ResultsObj) => {
          c._resultsObj = response;
          c._resultsObj._filteredResults = this.txtUser?c._resultsObj.results.filter(
              r => r.name.includes(this.txtUser) || r.club.includes(this.txtUser)
            ):c._resultsObj.results;

        });
      });
    });
  }

}
