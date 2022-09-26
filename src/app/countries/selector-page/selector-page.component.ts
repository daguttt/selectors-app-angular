import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { CountrySmall } from '../interfaces/countries.interface';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  regions: string[] = [];
  countries: CountrySmall[] = [];
  countriesInBorder: string[] = [];

  countriesForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    countriesInBorder: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // When region form control changes
    this.countriesForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => this.countriesForm.get('country')?.reset('')),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => (this.countries = countries));

    // When country form control changes
    this.countriesForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.countriesInBorder = [];
          this.countriesForm.get('countriesInBorder')?.reset('');
        }),
        switchMap((countryCode) =>
          this.countriesService.getCountryByCode(countryCode)
        )
      )
      .subscribe((arrayWithCountry) => {
        // When country form control is reset
        if (!arrayWithCountry.length) return;

        const [country] = arrayWithCountry;
        this.countriesInBorder = country.borders;
      });
  }

  onSubmit(): void {
    console.log(this.countriesForm.value);
  }
}
