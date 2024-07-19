import {ResultsObj} from "./results";

export class ClassesObj {
  status: string
  classes: Class[]
  hash: string

}

export class Class {
  className: string
  _resultsObj: ResultsObj
}

export class LapTimes {
  lap: number
  time: string
}


export interface Runner {
  Club: string
  Country: string
  DOB: string
  Firstname: string
  gender: string
  ID: number
  Lastname: string
  stats: Stat[]
}

export interface Stat {
  agegroup: any
  city: string
  country: string
  date: string
  eventcode: string
  gender: string
  ID: number
  indoor: number
  perf: string
  type: string
  wind: any
}

