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

  public todayDate = formatDate(new Date(),'yyyy-MM-dd','en');

  public competitionInfo: CompetitionInfo = new CompetitionInfo();
  public classesObj: ClassesObj = new ClassesObj();
  public resultsObjArray: ResultsObj[] = [];
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
      this.txtUser = this.userList[0]
    }
    this.service.getCompetitions().subscribe( (response:object) => {
      // @ts-ignore
      response.competitions.forEach( c => {
        this.competitionsOrig.push(c);
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
    this.service.getCompetitionInfo(id).subscribe((response:CompetitionInfo) => {
      this.competitionInfo =  response;
      this.getUserFilterResult(id);
    });
   /* this.service.getClasses(id).subscribe( (response:ClassesObj) => {
      this.classesObj = response;
    });
*/
    //this.classesObj = new ClassesObj();
    //console.log("check " + this.classesObj.status)
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

  clearForm() {
    this.compList = [];
    localStorage.removeItem('compList');
    this.txtComp = '';
    this.userList = [];
    localStorage.removeItem('userList');
    this.txtUser = '';
  }

  backUser() {
    this.userList.pop();
    localStorage.setItem('userList',this.userList.toString())
  }
  backComp() {
    this.compList.pop();
    localStorage.setItem('compList',this.compList.toString());
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

  getUserFilterResult(id:number){
    //console.log("check again " + this.classesObj.status)
    this.service.getClasses(id).subscribe( (response:ClassesObj) => {
      this.resultsObjArray = [];
      this.classesObj = response;
      this.classesObj.classes.forEach( c => {
        this.service.getClassResults(this.competitionInfo.id,c.className).subscribe((response:ResultsObj) => {
          var result:ResultsObj = response;
          result.filteredResults = this.txtUser?result.results.filter( r => r.name.includes(this.txtUser)):result.results;


          console.log(result.filteredResults[0]?.name + ' ' + result.filteredResults[0]?.start);

          this.resultsObjArray.push(  result );
        });
      });
    });
  }

}
