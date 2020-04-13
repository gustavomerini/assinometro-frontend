import { Component, Output, EventEmitter, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ComparePassword } from "src/app/shared/validators/compare-password.validator";
import { StrongPassword } from "src/app/shared/validators/strong-password.validator";

@Component({
  selector: "app-code-step",
  templateUrl: "code-step.component.html",
})
export class CodeStepComponent {
  public fields = [
    {
      description: this.translate.instant("form_code"),
      name: "code",
      type: "input",
    },
    {
      description: this.translate.instant("form_new_password"),
      name: "password",
      type: "password",
    },
    {
      description: this.translate.instant("form_confirm_password"),
      name: "confirmPassword",
      type: "password",
    },
  ];

  @Output() onSubmit = new EventEmitter();
  @Input() message = ""

  public codeForm = this.fb.group(
    {
      code: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      confirmPassword: ["", Validators.compose([Validators.required])],
    },
    {
      validators: [
        ComparePassword("password", "confirmPassword"),
        StrongPassword("password"),
      ],
    }
  );

  constructor(private translate: TranslateService, private fb: FormBuilder) {}

  public onSubmitAction(email) {
    this.onSubmit.emit(email);
  }
}
