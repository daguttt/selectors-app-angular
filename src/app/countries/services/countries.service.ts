import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions() {
    return [...this._regions];
  }
}
