import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ValidatorConceptServices implements AsyncValidator {

  private apiUrl: string = environment.supabaseurl

  constructor(private http: HttpClient) { }

    validate( control: AbstractControl): Observable<ValidationErrors | null> {
      let headers = new HttpHeaders({
        'apikey'       : environment.supabaseKey,
        'Authorization': environment.authorization,
      })
    const concept = control.value;
    return this.http.get<any[]>(`${this.apiUrl}/sidecomexRates?concept=eq.${ concept}`, {headers})
                .pipe(
                  map( resp => {
                    return ( resp.length === 0 )
                        ? null
                        : { conceptExist: 'Este item ya existe en la base de datos' }
                  })
                );
  }

}

