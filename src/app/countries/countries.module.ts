import { NgModule } from '@angular/core';
import { SelectorPageComponent } from './selector-page/selector-page.component';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  imports: [CountriesRoutingModule],
  declarations: [SelectorPageComponent],
  exports: [SelectorPageComponent],
})
export class CountriesModule {}
