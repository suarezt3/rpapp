import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ValidatorShippingServices implements AsyncValidator {

  private apiUrl        : string = environment.supabaseurl

  constructor(private http: HttpClient) { }

    validate( control: AbstractControl): Observable<ValidationErrors | null> {
      let headers = new HttpHeaders({
        'apikey'       : environment.supabaseKey,
        'Authorization': environment.authorization,
      })
    const shipping = control.value.toUpperCase();
    return this.http.get<any[]>(`${this.apiUrl}/agentFees?shippingCompany=eq.${ shipping }`, {headers})
                .pipe(
                  map( resp => {
                    return ( resp.length === 0 )
                        ? null
                        : { shippingExist: 'Esta naviera ya esta registrada en la base de datos' }
                  })
                );
  }

}
