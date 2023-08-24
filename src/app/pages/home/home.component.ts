import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Competition} from "../../models/competition";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {CompetitionInfo} from "../../models/competition-info";
import {ClassesObj} from "../../models/classes";


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
  //protected readonly JSON = JSON;
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
  }


  clickCompetition(id:number) {
    console.log(id)
    this.service.getCompetitionInfo(id).subscribe((response:CompetitionInfo) => {
      this.competitionInfo =  response;
    });
    console.log('yyyy1')
    this.service.getClasses(id).subscribe( (response:ClassesObj) => {
      this.classesObj = response;
      console.log('yyyy2');
    });

    console.log('yyyy3')

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

  doFilter() {
    this.competitions = this.competitionsOrig.filter( c => c.name.includes(this.txtComp));
  }

  selectFilter(value:string) {
    this.txtComp = value;
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


  doFilterUser() {
    console.log('Filter user')
   // this.competitions = this.competitionsOrig.filter( c => c.name.includes(this.txtSearch));
  }

  submitFormUser() {
    console.log(this.txtUser);
    this.userList.push(this.txtUser);
    localStorage.setItem('userList',this.userList.toString())
  }

  selectFilterUser(value:string) {
    this.txtUser = value;
    (document.getElementById('tab0') as HTMLElement).click();
  }

  filterToday(comp: Competition[]) {
    return comp.filter( c => c.date === this.todayDate);
  }

}
