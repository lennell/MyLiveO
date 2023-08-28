export class ResultsObj {
  status: string
  className: string
  splitcontrols: any[]
  results: Result[]
  hash: string
  filteredResults: Result[]
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
}
