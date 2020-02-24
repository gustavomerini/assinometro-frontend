import { Component, OnInit, Input } from "@angular/core";
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
import { ComparePassword } from 'src/app/shared/validators/compare-password.validator';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group(
    {
      email: [
        "merinigames@hotmail.com",
        Validators.compose([Validators.required])
      ],
      username: ["gutomerini", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      confirmPassword: [
        "",
        Validators.compose([Validators.required])
      ]
    },
    {
      // Used custom form validator name
      validator: ComparePassword("password", "confirmPassword")
    }
  );
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
