import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClrLoadingState } from "@clr/angular";

import { handleCognitoError } from "src/app/shared/utils/utils";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { User } from "src/app/core/services/user/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("clrForm", { static: true }) clrForm;
  public loginForm = this.fb.group({
    username: ["", Validators.compose([Validators.required])],
    password: ["", Validators.compose([Validators.required])]
  });
  public validationError = false;
  public message = "";
  public alertRole = "";
  public loginBtnState = ClrLoadingState.DEFAULT;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public async loginUser() {
    if (this.loginForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.loginBtnState = ClrLoadingState.LOADING;
    const { username, password } = this.loginForm.value;
    const user: User = {
      username,
      password
    };
    this.closeAlert();
    const response = await this.authService.loginUser(user);
    response.code ? this.loginFailed(response) : this.router.navigate(["/dashboard"]);
  }

  private loginFailed(error) {
    this.message = this.translate.instant(handleCognitoError(error));
    this.alertRole = "alert-danger";
    this.loginBtnState = ClrLoadingState.ERROR;
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }

}
