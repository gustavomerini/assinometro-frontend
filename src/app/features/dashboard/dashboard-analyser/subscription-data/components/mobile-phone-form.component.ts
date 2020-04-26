import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-mobile-form",
  template: `
    <form [formGroup]="mobileForm" class="clr-form clr-form-compact">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input
          [hideLabel]="false"
          [field]="field"
          [parent]="mobileForm"
        ></app-clarity-input>
      </div>
    </form>
  `,
})
export class MobilePhoneFormComponent implements OnInit {
  public fields = [
    {
      description: this.translate.instant("form_gb_quantity"),
      name: "gbQuantity",
      type: "input",
    },
    {
      description: this.translate.instant("form_has_unlimited_internet_app"),
      name: "hasUnlimitedInternetApp",
      type: "input",
    },
    {
      description: this.translate.instant("form_unlimited_calls_brasil"),
      name: "unlimitedCallsBrasil",
      type: "input",
    },
  ];
  public mobileForm = this.fb.group({
    gbQuantity: ["", [Validators.required]],
    hasUnlimitedInternetApp: ["", [Validators.required]],
    unlimitedCallsBrasil: ["", [Validators.required]],
  });
  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {}
}
