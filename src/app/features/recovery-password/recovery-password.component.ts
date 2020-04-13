import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClrLoadingState } from "@clr/angular";

import { AuthenticationService } from "src/app/core/services/authentication.service";
import { handleCognitoError } from "src/app/shared/utils/utils";

@Component({
  selector: "app-recovery-password",
  templateUrl: "./recovery-password.component.html",
  styleUrls: ["./recovery-password.component.scss"],
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {
  @ViewChild("clrForm", { static: true }) clrForm;

  public newPasswordForm = this.fb.group({});
  public validationError = false;
  public alertRole = "";
  public step = "email";
  private currentEmail = "";
  public message = this.translate.instant("recovery_message");
  public loadingState = ClrLoadingState.DEFAULT;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.currentEmail = "";
  }

  public sendEmail(form) {
    this.loadingState = ClrLoadingState.LOADING;
    this.authService.sendRecoveryEmail(form.email).then(
      (response) => {
        if (response.code) {
          this.message = this.translate.instant(handleCognitoError(response));
          this.loadingState = ClrLoadingState.DEFAULT;
          this.alertRole = "alert-danger";
          return;
        }
        this.alertRole = "alert-info";
        this.message = this.translate.instant("email_sent_sucess");
        this.currentEmail = form.email;
        this.step = "code";
        this.loadingState = ClrLoadingState.DEFAULT;
      },
      (error) => {}
    );
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }

  public changeUserPassword(form) {
    const { code, password } = form;
    this.loadingState = ClrLoadingState.LOADING;
    this.closeAlert();
    this.authService
      .changePasswordByRecovery(this.currentEmail, code, password)
      .then(
        (response: any) => {
          if (response.code) {
            this.message = this.translate.instant(handleCognitoError(response));
            this.loadingState = ClrLoadingState.DEFAULT;
            this.alertRole = "alert-danger";
            return;
          }
          this.alertRole = "alert-info";
          this.message = this.translate.instant("password_changed_sucess");
          this.currentEmail = "";
          this.loadingState = ClrLoadingState.DEFAULT;
        },
        (error) => {
          console.error(error);
          this.message = this.translate.instant("password_changed_error");
          this.loadingState = ClrLoadingState.DEFAULT;
        }
      );
  }
}
