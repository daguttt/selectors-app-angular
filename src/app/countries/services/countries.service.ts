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
    return this.getCountriesSmall(`/region/${region}?fields=name,cca3,borders`);
  }

  getCountriesByBorderCodes(borderCodes: string[]): Observable<CountrySmall[]> {
    if (!borderCodes || borderCodes.length === 0) return of([]);
    return this.getCountriesSmall(
      `/alpha?codes=${borderCodes}&fields=name,cca3`
    );
  }

  private getCountriesSmall(endpoint: string): Observable<CountrySmall[]> {
    const url = this._restCountriesURL;
    return this.http.get<CountrySmall[]>(`${url}${endpoint}`);
  }
}
