import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { Country, CountrySmall } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _restCountriesURL = environment.restCountriesUrl;
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private http: HttpClient) {}

  get regions() {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountrySmall[]> {
    const url = this._restCountriesURL;
    return this.http.get<CountrySmall[]>(
      `${url}/region/${region}?fields=name,cca3`
    );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    // When reseting form control it can be ''
    if (!code) return of([]);

    const url = this._restCountriesURL;
    return this.http.get<Country[]>(`${url}/alpha/${code}`);
  }
}
