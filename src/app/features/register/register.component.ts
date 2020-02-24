import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { handleCognitoError } from "src/app/shared/utils/utils";
import { Router } from "@angular/router";
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    email: [
      "merinigames@hotmail.com",
      Validators.compose([Validators.required])
    ],
    username: ["gutomerini", Validators.compose([Validators.required])],
    password: ["g#79O4+|W-#nY9k", Validators.compose([Validators.required])],
    confirmPassword: [
      "g#79O4+|W-#nY9k",
      Validators.compose([Validators.required])
    ]
  });
  public message = "";
  public alertRole = "";
  public registerBtnState = ClrLoadingState.DEFAULT;

  constructor(private fb: FormBuilder, public translate: TranslateService) {}

  ngOnInit(): void {}

  public async registerUser() {
    const { username, password, email } = this.registerForm.value;
    this.registerBtnState = ClrLoadingState.LOADING;
    this.closeAlert();
    const user = {
      username,
      password,
      attributes: {
        email
      }
    };
    try {
      const signUpResponse = await Auth.signUp(user);
      this.message = this.translate.instant("check_your_email");
      this.alertRole = "alert-info";
      this.registerBtnState = ClrLoadingState.SUCCESS;
    } catch (error) {
      this.message = this.translate.instant(handleCognitoError(error));
      this.alertRole = "alert-danger";
      this.registerBtnState = ClrLoadingState.ERROR;
    }
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }
}
