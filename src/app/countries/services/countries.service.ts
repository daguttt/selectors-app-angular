import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, of, map, forkJoin, combineLatest } from 'rxjs';
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

  getCountryByCode(countryCode: string): Observable<Country | null> {
    // When reseting form control it can be: ''
    if (!countryCode) return of(null);

    const url = this._restCountriesURL;
    return (
      this.http
        .get<Country[]>(`${url}/alpha/${countryCode}`)
        // Request return an array with the country
        .pipe(map((arrayWithCountry) => arrayWithCountry[0]))
    );
  }

  getCountrySmallByCode(countryCode: string): Observable<CountrySmall> {
    const url = this._restCountriesURL;
    return this.http.get<CountrySmall>(
      `${url}/alpha/${countryCode}?fields=name,cca3` // With query params returns just the object
    );
  }

  getCountriesByBorderCodes(borderCodes: string[]): Observable<CountrySmall[]> {
    if (!borderCodes || borderCodes.length === 0) return of([]);

    const requests: Observable<CountrySmall>[] = borderCodes.map((borderCode) =>
      this.getCountrySmallByCode(borderCode)
    );
    return forkJoin(requests);
    // return combineLatest<CountrySmall[]>(requests); // By the course
  }
}
