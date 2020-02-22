import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-clarity-form",
  templateUrl: "./clarity-form.component.html",
  styleUrls: ["./clarity-form.component.scss"]
})
export class ClarityFormComponent implements OnInit {
  @Input()
  clrFormGroup: FormGroup;
  @Input()
  fieldName: string;

  public validations: string[];
  public control: AbstractControl;

  constructor() {}

  ngOnInit(): void {
    console.log("clr form", this.clrFormGroup, this.fieldName);
    this.validations = Object.keys(this.clrFormGroup.get(this.fieldName).errors);
    this.control = this.clrFormGroup.get(this.fieldName);
  }

  public formHasError() {
    return this.control.invalid && (this.control.dirty || this.control.touched)
  }
}
