import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClrLoadingState } from "@clr/angular";

import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ComparePassword } from "src/app/shared/validators/compare-password.validator";
import { StrongPassword } from "src/app/shared/validators/strong-password.validator";

@Component({
  selector: "app-recovery-password",
  templateUrl: "./recovery-password.component.html",
  styleUrls: ["./recovery-password.component.scss"],
})
export class RecoveryPasswordComponent implements OnInit {
  @ViewChild("clrForm", { static: true }) clrForm;

  public recoveryForm = this.fb.group(
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
  public newPasswordForm = this.fb.group({});
  public validationError = false;
  public message = "";
  public alertRole = "";
  public step = "email";
  public loginBtnState = ClrLoadingState.DEFAULT;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public async changePassword() {
    if (this.recoveryForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.loginBtnState = ClrLoadingState.LOADING;
    const { email, code, password } = this.recoveryForm.value;
    this.closeAlert();
    const response = await this.authService.changePasswordByRecovery(
      email,
      code,
      password
    );
  }

  public sendRecoveryEmail() {
    const { username } = this.recoveryForm.value;
    this.message = this.translate.instant("recovery_email_message");
    this.authService.sendRecoveryEmail(username);
  }

  public sendEmail(email) {
    this.authService.sendRecoveryEmail(email);
    this.step = "code";
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }

  public changeUserPassword(tetse) {}
}
