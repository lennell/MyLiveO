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
