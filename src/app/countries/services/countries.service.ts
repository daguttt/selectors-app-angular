import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, of, map } from 'rxjs';
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

  getCountryByCode(code: string): Observable<Country | null> {
    // When reseting form control it can be ''
    if (!code) return of(null);

    const url = this._restCountriesURL;
    return (
      this.http
        .get<Country[]>(`${url}/alpha/${code}`)
        // Request return an array with the country
        .pipe(map((arrayWithCountry) => arrayWithCountry[0]))
    );
  }
}
