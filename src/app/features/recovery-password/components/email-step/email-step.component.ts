import { Component, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector: "app-email-step",
  templateUrl: "email-step.component.html",
})
export class EmailStepComponent {
  public fields = [
    {
      description: this.translate.instant("email"),
      name: "email",
      type: "input",
    },
  ];

  @Output() onSubmit = new EventEmitter();

  public message = "";

  public emailForm = this.fb.group({
    email: ["", Validators.compose([Validators.required])],
  });

  constructor(private translate: TranslateService, private fb: FormBuilder) {}

  public onSubmitAction(email) {
    this.onSubmit.emit(email);
  }
}
