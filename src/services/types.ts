//https://transform.tools/json-to-typescript

export interface Request {
  count: number,
  pages: number,
  next: string,
  prev: string
}
export interface Response {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: any
}

export interface Result {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface LocationResult {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}
export interface LocationResponse {
  info: Info
  results: LocationResult[]
}
