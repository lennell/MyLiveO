export class ResultsObj {
  status: string
  className: string
  splitcontrols: Splitcontrol[]
  results: Result[]
  hash: string
  _filteredResults: Result[]
}

export class Splitcontrol {
  code: number
  name: string
}

export class Result {
  place: string
  name: string
  club: string
  result: string
  status: number
  timeplus: string
  progress: number
  start: number
  splits: any
}
