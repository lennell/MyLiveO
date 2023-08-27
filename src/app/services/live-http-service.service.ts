import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Competition} from "../models/competition";
import {CompetitionInfo} from "../models/competition-info";
import {ClassesObj} from "../models/classes";
import {ResultsObj} from "../models/results";

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

  getClasses(id:number):Observable<ClassesObj>{
    return this.http.get<ClassesObj>(this.API_URL+'?method=getclasses&comp='+id+'&last_hash=aa')
  }

  getClassResults(id:number,clas:string):Observable<ResultsObj>{
    return this.http.get<ResultsObj>(this.API_URL+'?comp='+id+'&method=getclassresults&unformattedTimes=false&class='+clas);
  }

}
