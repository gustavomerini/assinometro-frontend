import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { ClrLoadingState } from "@clr/angular";

import { handleCognitoError } from "src/app/shared/utils/utils";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild('clrForm', {static: true}) clrForm;
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  public async loginUser() {
    if (this.loginForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }    
    this.loginBtnState = ClrLoadingState.LOADING;
    const { username, password } = this.loginForm.value;
    const user = {
      username,
      password
    };
    this.closeAlert();
    try {
      await Auth.signIn(user);
      this.router.navigate(["/dashboard"]);
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
