export interface PORTFEES {
  created_at     : string,
  id             : string,
  inspection     : number,
  load           : number,
  portTerminal   : string,
  relocation     : number,
  storage        : number,
  totalUSD       : number,
  useInstalations: number,
  weighing       : number
}

export interface PORTS {
  created_at     : string,
  id             : string,
  namePort       : string,
}
