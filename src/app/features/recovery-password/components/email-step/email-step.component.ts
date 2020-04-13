import { Component, Output, EventEmitter, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-email-step",
  templateUrl: "email-step.component.html",
})
export class EmailStepComponent {
  public fields = [
    {
      description: this.translate.instant("form_email"),
      name: "email",
      type: "input",
    },
  ];

  @Output() onSubmit = new EventEmitter();
  @Input() message = "";

  public emailForm = this.fb.group({
    email: ["", Validators.compose([Validators.required])],
  });

  constructor(private translate: TranslateService, private fb: FormBuilder) {}

  public onSubmitAction(email) {
    this.onSubmit.emit(email);
  }
}
