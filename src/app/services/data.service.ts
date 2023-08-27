import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlPortFees= "https://iekthyollpfeqolwzaqu.supabase.co/rest/v1/portFees"

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
     return this.http.get<any>(this.urlPortFees, {headers}).pipe()
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
   return this.http.get<any>( `${this.urlPortFees}?portTerminal=eq.${port}` , {headers}).pipe()
}


  /**
 *
 * @returns Crea las tarifas de un puerto
 */
  createPortFees(body: {}) {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json'
    })
     return this.http.post<any>(this.urlPortFees, body, {headers})
 }


 editPortFees(port: string, body: {}) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
    'Content-Type' : 'application/json',
  })

   return this.http.patch(`${this.urlPortFees}?portTerminal=eq.${port}`, body, {headers}).pipe()
}


}
