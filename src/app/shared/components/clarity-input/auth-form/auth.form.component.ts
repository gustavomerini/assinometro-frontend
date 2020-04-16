import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ClrLoadingState } from "@clr/angular";
import { Field } from "./node_modules/src/app/core/services/field/field";

@Component({
  selector: "app-auth-form",
  templateUrl: "auth-form.component.html",
  styleUrls: ["auth-form.component.scss"],
})
export class AuthFormComponent {
  @Output() onSubmit = new EventEmitter();
  @Input() anchorRoute: string;
  @Input() anchorMessage: string;
  @Input() form: FormGroup;
  @Input() fields: Field[];
  @Input() message = "";
  @Input() loadingState = ClrLoadingState.DEFAULT;
  @Input() alertRole = "";
  @Input() showForgetPassword = false;

  constructor() {}

  onSubmitAction() {
    if (this.form.invalid) {
      return;
    }
    this.onSubmit.emit(this.form.value);
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }
}
