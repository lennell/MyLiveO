import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competition} from "../models/competition";
import {CompetitionInfo} from "../models/competition-info";

@Injectable({
  providedIn: 'root'
})
export class LiveHttpServiceService {


  API_URL :string = "https://liveresultat.orientering.se/api.php";
  constructor(private http:HttpClient) { }

  getCompetitions():Observable<Object>{
    return this.http.get<any>(this.API_URL+'?method=getcompetitions');
  }

  getCompetitionInfo(id:number):Observable<CompetitionInfo>{
     return this.http.get<CompetitionInfo>(this.API_URL+'?method=getcompetitioninfo&comp='+id);
  }
}
