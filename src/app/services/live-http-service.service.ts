import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competition} from "../models/competition";
import {CompetitionInfo} from "../models/competition-info";
import {Classes} from "../models/classes";

@Injectable({
  providedIn: 'root'
})
export class LiveHttpServiceService {


  API_URL :string = "https://liveresultat.orientering.se/api.php";
  constructor(private http:HttpClient) { }

  getCompetitions():Observable<Object>{
    var r = this.http.get<Object>(this.API_URL+'?method=getcompetitions');
    return r;
  }

  getCompetitionInfo(id:number):Observable<CompetitionInfo>{
     return this.http.get<CompetitionInfo>(this.API_URL+'?method=getcompetitioninfo&comp='+id);
  }

  getClasses(id:number):Observable<Classes>{
    return this.http.get<Classes>(this.API_URL+'?method=getclasses&comp='+id+'&last_hash=aa')
  }
}
