import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  FormBuilder,
  Validators,
  Validator,
  AbstractControl
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { handleCognitoError } from "src/app/shared/utils/utils";
import { ClrLoadingState } from "@clr/angular";
import { ComparePassword } from "src/app/shared/validators/compare-password.validator";
import { StrongPassword } from "src/app/shared/validators/strong-password.validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("clrForm", { static: true }) clrForm;
  public registerForm = this.fb.group(
    {
      email: ["merinigames@hotmail.com", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    },
    {
      validators: [
        ComparePassword("password", "confirmPassword"),
        StrongPassword("password")
      ]
    }
  );
  public message = "";
  public alertRole = "";
  public registerBtnState = ClrLoadingState.DEFAULT;

  constructor(private fb: FormBuilder, public translate: TranslateService) {}

  ngOnInit(): void {}

  public async registerUser() {
    if (this.registerForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.registerBtnState = ClrLoadingState.LOADING;
    const { username, password, email } = this.registerForm.value;
    this.closeAlert();
    const user = {
      username: email,
      password,
    };
    try {
      await Auth.signUp(user);
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
