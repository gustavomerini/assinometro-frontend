import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { ClrLoadingState } from '@clr/angular';

import { handleCognitoError } from "src/app/shared/utils/utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    username: ["", Validators.compose([Validators.required])],
    password: ["", Validators.compose([Validators.required])]
  });
  public validationError = false;
  public message = "";
  public alertRole = "";
  public loginBtnState = ClrLoadingState.DEFAULT;

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {}

  public async loginUser() {
    this.loginBtnState = ClrLoadingState.LOADING;
    const { username, password } = this.loginForm.value;
    const user = {
      username,
      password
    };
    this.closeAlert();
    try {
      const signInResponse = await Auth.signIn(user);
      this.loginBtnState = ClrLoadingState.SUCCESS;
    } catch (error) {
      this.message = this.translate.instant(handleCognitoError(error));
      this.alertRole = "alert-danger";
      this.loginBtnState = ClrLoadingState.ERROR;
    }
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }
}
