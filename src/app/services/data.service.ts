import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL: string = environment.supabaseurl

  constructor(private http: HttpClient) { }



//?-----------------------------------GET--------------------------------------

/**
 *
 * @returns Trae la tabla las tarifas de los puertos
 */
  getPortFees() {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization
    })
     return this.http.get<any>(`${this.apiURL}/portFees`, {headers}).pipe()
}


/**
 *
 * @returns Trae la tabla las tarifas de los puertos
 */
getAgentFees() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/agentFees`, {headers}).pipe()
}


/**
 *
 * @returns Trae la lista de todos puertos
 */
getPorts() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/ports`, {headers}).pipe()
}


/**
 *
 * @returns Trae la lista de todas la navieras
 */
getShipping() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/shippingCompany`, {headers}).pipe()
}


/**
 *
 * @returns Trae la lista de todas la navieras
 */
getConcepts() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/concepts`, {headers}).pipe()
}


/**
 *
 * @returns Trae la lista de todas la navieras
 */
getSidecomexRates() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/sidecomexRates`, {headers}).pipe()
}

/**
 *
 * @returns Trae la lista de las transportadoras de Buenaventura
 */
getBuenaventuraTransporters() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/buenaventuraTransporters`, {headers}).pipe()
}


/**
 *
 * @returns Trae las tarifas de las transportadoras de buenaventura-cali
 */
getTransportersBuenaventura() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/transportersBuenaventura`, {headers}).pipe()
}

/**
 *
 * @returns Trae las tarifas de las transportadoras de buenaventura-cali
 */
getTransportersCartagena() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/transportersCartagena`, {headers}).pipe()
}

/**
 *
 * @returns Trae la lista de las transportadoras de Cartagena
 */
getCartagenaTransporters() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.apiURL}/cartagenaTransporters`, {headers}).pipe()
}


 /**
 *
 * @returns Trae la tabla la tarifa de una naviera individual
 */
 getShipphingFeesID(shipping: string) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}/agentFees?shippingCompany=eq.${shipping}`,{headers}).pipe()
}


 /**
 *
 * @returns Trae la tabla la tarifa de un puerto individual
 */
 getPortFeesID(port: string) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}/portFees?portTerminal=eq.${port}` , {headers}).pipe()
}

/**
 *
 * @param concept Devuelve los datos de tabla que coincide con el concepto enviado
 * @returns
 */
getConceptID(concept: string){
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}/sidecomexRates?concept=eq.${concept}` , {headers}).pipe()
}

/**
 *
 * @param concept Devuelve los datos de tabla que coincide con el concepto enviado
 * @returns
 */
getTransporterID(transporter: string){
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}/transportersBuenaventura?buenaventuraCali=eq.${transporter}` , {headers}).pipe()
}

/**
 *
 * @param concept Devuelve los datos de tabla que coincide con el concepto enviado
 * @returns
 */
getCartagenaTransporterID(transporter: string){
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}/transportersCartagena?cartagenaMalambo=eq.${transporter}` , {headers}).pipe()
}

/**
 *
 * @param concept Devuelve los datos de los codigos de los materiales
 * @returns
 */
getCodigoMaterial(){
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>( `${this.apiURL}//codigoMaterial` , {headers}).pipe()
}


//?---------------------------------POST-------------------------------------------

/**
 *
 * @returns enviar el formulario con las tarifas de un puerto
 */
  createPortFees(body: {}) {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json'
    })
     return this.http.post<any>(`${this.apiURL}/portFees`, body, {headers})
 }


 /**
 *
 * @returns enviar el formulario con las tarifas de una naviera
 */
 createShippingFees(body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json'
  })
   return this.http.post<any>(`${this.apiURL}/agentFees`, body, {headers})
}


 /**
 *
 * @returns enviar el formulario con las tarifas de una naviera
 */
 createSidecomexRates(body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json'
  })
   return this.http.post<any>(`${this.apiURL}/sidecomexRates`, body, {headers})
}

/**
 *
 * @returns Tenviar el formulario con las tarifas de transportes buenaventura-cali
 */
createtBuenaventuraTransporters(body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.post<any>(`${this.apiURL}/transportersBuenaventura`, body, {headers}).pipe()
}

/**
 *
 * @returns Tenviar el formulario con las tarifas de transportes buenaventura-cali
 */
createtCartagenaTransporters(body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.post<any>(`${this.apiURL}/transportersCartagena`, body, {headers}).pipe()
}




//?------------------------------------PATCH-----------------------------------------

/**
 *
 * @param port Para actualizar las tarifas de un puerto
 * @param body
 * @returns
 */
 editPortFees(port: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/portFees?portTerminal=eq.${port}`, body, {headers}).pipe()
}


/**
 *
 * @param shipping Para actualizar las tarifas de una naviera
 * @param body
 * @returns
 */
editShippingFees(shipping: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/agentFees?shippingCompany=eq.${shipping}`, body, {headers}).pipe()
}

/**
 *
 * @param shipping Para actualizar las tarifas de los conceptos
 * @param body
 * @returns
 */
editConcept(concept: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/sidecomexRates?concept=eq.${concept}`, body, {headers}).pipe()
}

/**
 *
 * @param shipping Para actualizar las tarifas de los conceptos
 * @param body
 * @returns
 */
editTransporter(transporter: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/transportersBuenaventura?buenaventuraCali=eq.${transporter}`, body, {headers}).pipe()
}

/**
 *
 * @param shipping Para actualizar las tarifas de los conceptos
 * @param body
 * @returns
 */
editCartagenaTransporter(transporter: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/transportersCartagena?cartagenaMalambo=eq.${transporter}`, body, {headers}).pipe()
}

}
