import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ValidatorServices implements AsyncValidator {

  private apiUrl        : string = "https://iekthyollpfeqolwzaqu.supabase.co/rest/v1/portFees?portTerminal=eq.";//URl para consultar los puertos en la base de datos

  constructor(private http: HttpClient) { }

    validate( control: AbstractControl): Observable<ValidationErrors | null> {
      let headers = new HttpHeaders({
        'apikey'       : environment.supabaseKey,
        'Authorization': environment.authorization,
      })
    const port = control.value.toUpperCase();
    return this.http.get<any[]>(`${this.apiUrl}${ port }`, {headers})
                .pipe(
                  map( resp => {
                    return ( resp.length === 0 )
                        ? null
                        : { portExist: 'Este puerto ya esta registrado en la base de datos' }
                  })
                );
  }

}

