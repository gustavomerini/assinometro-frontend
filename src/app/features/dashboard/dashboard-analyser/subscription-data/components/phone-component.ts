import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-phone-form",
  template: `
    <form [formGroup]="phoneForm" class="clr-form clr-form-compact">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input
          [hideLabel]="false"
          [field]="field"
          [parent]="phoneForm"
        ></app-clarity-input>
      </div>
    </form>
  `,
})
export class PhoneFormComponent implements OnInit {
  public fields = [
    {
      description: this.translate.instant("form_unlimited_mobile_calls"),
      name: "unlimitedMobileCalls",
      type: "input",
    },
    {
      description: this.translate.instant("form_unlimited_phone_calls"),
      name: "unlimitedPhoneCalls",
      type: "input",
    },
    {
      description: this.translate.instant("form_all_operators"),
      name: "allOperators",
      type: "input",
    },
  ];
  public phoneForm = this.fb.group({
    unlimitedMobileCalls: ["", [Validators.required]],
    unlimitedPhoneCalls: ["", [Validators.required]],
    allOperators: ["", [Validators.required]],
  });
  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {}
}
