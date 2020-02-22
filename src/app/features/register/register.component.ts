import { Component, OnInit } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    confirmPassword: [''],
  });
  public validationError = false;

  constructor(private fb: FormBuilder, public translate: TranslateService) {
    console.log("register bootstrap");
  }

  ngOnInit(): void {}
}
