import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Competition} from "../../models/competition";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {CompetitionInfo} from "../../models/competition-info";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected readonly top = top;
  public searchList: string[] = [];
  public txtSearch:string = '';
  public competitionsOrig: Competition[] = [];
  public competitions: Competition[] = [];
  public todayDate = formatDate(new Date(),'yyyy-MM-dd','en');
  public competitionInfo: CompetitionInfo = new CompetitionInfo();

  selectedIndex: number = 0;
  @ViewChild('tabs', { static: true }) tabsRef: ElementRef | undefined;

  constructor(private service:LiveHttpServiceService) {
  }

  ngOnInit(): void {
    console.log('init');
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

  submitForm() {
    console.log(this.txtSearch);
    this.searchList.push(this.txtSearch);

  }


  doFilter() {
    this.competitions = this.competitionsOrig.filter( c => c.name.includes(this.txtSearch));
  }

  protected readonly Date = Date;

  selectFilter(value:string) {
    console.log("yyyy " + value)
    this.txtSearch = value;
  }

  clearForm() {
    this.searchList = [];
    this.txtSearch = '';
  }

  protected readonly JSON = JSON;
}
