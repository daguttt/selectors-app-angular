import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorPageComponent } from './selector-page/selector-page.component';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule],
  declarations: [SelectorPageComponent],
  exports: [SelectorPageComponent],
})
export class CountriesModule {}
