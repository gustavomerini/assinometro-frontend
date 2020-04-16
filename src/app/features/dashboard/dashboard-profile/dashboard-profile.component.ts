import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ComparePassword } from "src/app/shared/validators/compare-password.validator";
import { StrongPassword } from "src/app/shared/validators/strong-password.validator";
import { Router } from "@angular/router";
import { handleCognitoError } from "src/app/shared/utils/utils";

@Component({
  selector: "app-dashboard-profile",
  templateUrl: "./dashboard-profile.component.html",
  styleUrls: ["./dashboard-profile.component.scss"],
})
export class DashboardProfileComponent implements OnInit {
  user: any;
  isloading = true;
  public message = "";
  public alertRole = "alert-danger";
  @ViewChild("clrForm", { static: true }) clrForm;
  public profileForm = this.fb.group(
    {
      email: [{ value: "", disabled: true }, [Validators.required]],
      oldPassword: ["", [Validators.required]],
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
  isLoading = true;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initUserInfo();
  }

  private async initUserInfo() {
    try {
      this.user = await this.authService.getUserInfo();
      this.profileForm.get("email").setValue(this.user.attributes.email);
      this.isLoading = false;
    } catch {
      this.isLoading = false;
    }
  }

  public async changePassword() {
    if (this.profileForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.isLoading = true;
    const { oldPassword, password } = this.profileForm.value;
    try {
      const response: any = await this.authService.changePasswordByAuthentication(
        this.user,
        oldPassword,
        password
      );
      this.isLoading = false;
      console.log(response);
      if (response.code) {
        this.message = this.translate.instant(`${handleCognitoError(response)}_profile_page`);
        return;
      }

      this.router.navigate(["dashboard/summary"]);
    } catch {
      this.isLoading = false;
      this.message = this.translate.instant("unknown_error");
    }
  }

  public cancel() {
    this.router.navigate(["dashboard/summary"]);
  }

  public closeAlert() {
    this.message = "";
  }
}
