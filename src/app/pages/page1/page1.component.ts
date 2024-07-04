import { Component } from '@angular/core';
import {LapTimes} from "../../models/classes";
import {TdsDatetime} from "@scania/tegel-angular";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  txtDistance: number = 800;
  drpTrackDistance: number;
  txtTargetTime: string ;
  lapTimes: LapTimes[] = [];

  createDate(min:number,sec:number):Date {
    let ret = new Date();
    ret.setHours(0);
    ret.setMinutes(min);
    ret.setSeconds(sec);
    return ret;
  }

  doCalc() {
    this.lapTimes.length = 0;
    console.log(this.txtDistance + ' ' + this.drpTrackDistance + ' ' + this.txtTargetTime);
    let laps: number = this.txtDistance / this.drpTrackDistance;
    let minutes = +this.txtTargetTime.split(':')[0];
    let seconds = +this.txtTargetTime.split(':')[1];
    let totalSeconds = minutes * 60 + seconds;
    let secondsPerLap = totalSeconds / laps;
    console.log('aaa ' + secondsPerLap);


    let lapDate = this.createDate(0, 0);

    for (let i = 1; i <= laps; i++) {
      let newDate = new Date(lapDate.getTime() + secondsPerLap * i* 1000);
      console.log('yy '+i+' ' + newDate)
      let lap = new LapTimes();
      lap.lap = i;
      lap.time = newDate.getMinutes().toString().padStart(2, '0') + ':' + newDate.getSeconds().toString().padStart(2, '0');
      this.lapTimes.push(lap);
    }

  }


  doChangeDropdown($event: any) {
    this.drpTrackDistance = $event.detail.value;
  }

  modifyAddColon() {

    if (this.txtTargetTime.length==4&& this.txtTargetTime.indexOf(':')==-1) {
      let start = this.txtTargetTime.substring(0,2);
      let end = this.txtTargetTime.substring(2);

      this.txtTargetTime = start + ':' + end;
    }
  }
}
