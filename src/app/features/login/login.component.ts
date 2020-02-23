import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Auth } from "aws-amplify";
import { handleCognitoError } from 'src/app/shared/functions/utils';

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
  public errorMessage = "";

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {}

  public async loginUser() {
    const formValue = this.loginForm.value;
    const user = {
      username: formValue.username,
      password: formValue.password
    };
    console.log({ user });
    try {
      const signInResponse = await Auth.signIn(user);
    } catch (error) {
      this.errorMessage = this.translate.instant(handleCognitoError(error));
    }
  }
}
