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
 * @returns Trae la tabla las tarifas de los puertos
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
 * @returns Trae la tabla las tarifas de los puertos
 */
  createPortFees(body: {}) {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json'
    })
     return this.http.post<any>(this.urlPortFees, body, {headers})
 }


}
