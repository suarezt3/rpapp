import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL= "https://iekthyollpfeqolwzaqu.supabase.co/rest/v1"

  constructor(private http: HttpClient) { }


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


 editPortFees(port: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })
   return this.http.patch(`${this.apiURL}/portFees?portTerminal=eq.${port}`, body, {headers}).pipe()
}


}
