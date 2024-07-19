import { Component } from '@angular/core';
import {Runner} from "../../models/classes";
import {LiveHttpServiceService} from "../../services/live-http-service.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  txtWid:string = '629197';
  runners:string[] = [];
  runnerList:Runner[];


  constructor(private service:LiveHttpServiceService,
              private spinner:NgxSpinnerService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('widList')){
        // @ts-ignore
      this.runners = localStorage.getItem('widList')?.split(',');
      this.reloadList();
    }
  }

  doAdd() {
    this.runners.push(this.txtWid);
    console.log('aa ' + this.runners.join());
    localStorage.setItem("widList",this.runners.join());
  }

  reloadList(){
    console.log('aa1');
    this.runnerList = [];
    this.runners.forEach( r => {
     console.log('aa2 '+ r);
     this.service.getStatistics(r).subscribe(
       (response:Runner) => {
            this.runnerList.push(response);
          }
     );
    });
    console.log('aa3 ' + this.runnerList.length)
  }
}
