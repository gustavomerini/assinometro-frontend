import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

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

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {}
}
