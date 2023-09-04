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

export interface SHIPPING {
  created_at      : string,
  id              : string,
  shippingCompany : string,
  container       : number,
  process         : number,
  total           : number,
  daysPerContainer: number,
  drop            : number,
  upDate          : string
}
