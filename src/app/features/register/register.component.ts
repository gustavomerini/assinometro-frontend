import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { handleCognitoError } from "src/app/shared/functions/utils";

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
  public errorMessage = "";

  constructor(private fb: FormBuilder, public translate: TranslateService) {
    console.log("register bootstrap");
  }

  ngOnInit(): void {}

  public async registerUser() {
    const { username, password, email } = this.registerForm.value;
    this.errorMessage = "";
    const user = {
      username,
      password,
      attributes: {
        email
      }
    };
    try {
      const signUpResponse = await Auth.signUp(user);
    } catch (error) {
      this.errorMessage = this.translate.instant(handleCognitoError(error));
    }
  }
}
