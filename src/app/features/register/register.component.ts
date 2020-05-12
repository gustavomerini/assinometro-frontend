import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";
import { handleCognitoError } from "src/app/shared/utils/utils";
import { ClrLoadingState } from "@clr/angular";
import { ComparePassword } from "src/app/shared/validators/compare-password.validator";
import { StrongPassword } from "src/app/shared/validators/strong-password.validator";
import { UserService } from "src/app/core/services/user/user.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("clrForm", { static: true }) clrForm;
  public fields = [
    {
      description: this.translate.instant("form_email"),
      name: "email",
      type: "input",
    },
    {
      description: this.translate.instant("form_password"),
      name: "password",
      type: "password",
    },
    {
      description: this.translate.instant("form_confirm_password"),
      name: "confirmPassword",
      type: "password",
    },
  ];
  public registerForm = this.fb.group(
    {
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    },
    {
      validators: [
        ComparePassword("password", "confirmPassword"),
        StrongPassword("password"),
      ],
    }
  );
  public message = "";
  public alertRole = "";
  public registerBtnState = ClrLoadingState.DEFAULT;

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public async registerUser(form) {
    if (this.registerForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.registerBtnState = ClrLoadingState.LOADING;
    const { password, email } = this.registerForm.value;
    this.closeAlert();
    const user = {
      username: email,
      password,
    };
    try {
      const response = await Auth.signUp(user);
      this.userService.createUser(response.userSub).subscribe(
        (res) => {
          this.message = this.translate.instant("check_your_email");
          this.alertRole = "alert-info";
          this.registerBtnState = ClrLoadingState.SUCCESS;
          setTimeout(() => {this.router.navigate(["/login"])}, 2000)
        },
        (error) => this.dispatchError(error)
      );
    } catch (error) {
      this.dispatchError(error);
    }
  }

  dispatchError(error) {
    this.message = this.translate.instant(handleCognitoError(error));
    this.alertRole = "alert-danger";
    this.registerBtnState = ClrLoadingState.ERROR;
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }
}
