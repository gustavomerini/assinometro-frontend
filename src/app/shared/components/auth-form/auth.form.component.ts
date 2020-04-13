import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ClrLoadingState } from "@clr/angular";
import { Field } from "src/app/core/services/field/field";

@Component({
  selector: "app-auth-form",
  templateUrl: "auth-form.component.html",
  styleUrls: ["auth-form.component.scss"],
})
export class AuthFormComponent {
  @Input()
  form: FormGroup;
  @Input()
  fields: Field[];
  @Output()
  onSubmit = new EventEmitter();
  @Input()
  message = "";
  inputMessage = ""
  alertRole = "";
  public loginBtnState = ClrLoadingState.DEFAULT;

  constructor() {}

  onSubmitAction() {
    if (this.form.invalid) {
      return;
    }
    this.inputMessage = this.message;
    this.onSubmit.emit(this.form.value);
  }

  public closeAlert() {
    this.inputMessage = "";
    this.alertRole = "";
  }
}
