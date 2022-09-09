import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent {
  countriesForm: FormGroup = this.fb.group({
    continent: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.countriesForm.value);
  }
}
