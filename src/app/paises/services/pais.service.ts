import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private baseUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams(){
    return new HttpParams().set('fields','name;capital;alpha2Code;flag;translations;population');
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    const url = `${this.baseUrl}/name/${termino}`;
 

    return this.http.get<Country[]>(url,{params: this.httpParams});

  }

  buscarCapital(termino: string): Observable<Country[]>{

    const url = `${this.baseUrl}/capital/${termino}`;

    return this.http.get<Country[]>(url,{ params: this.httpParams });
  }

  buscarPaisPorAlfa(id: string): Observable<Country>{
    const url = `${this.baseUrl}/alpha/${id}`;

    return this.http.get<Country>(url);
  }

  buscarPorRegion(region:string): Observable<Country[]>{

    const url = `${this.baseUrl}/region/${region}`;

    return this.http.get<Country[]>(url,{ params: this.httpParams });
    
  }
}
