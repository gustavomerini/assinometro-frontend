import { Injectable } from "@angular/core";
import Auth from "@aws-amplify/auth";
import { Router, CanActivate } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UserLoggedInGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      Auth.currentSession()
        .then(() => resolve(true))
        .catch(() => {
          this.router.navigate(["/login"]);
          resolve(false);
        });
    });
  }
}
@Injectable({ providedIn: "root" })
export class NegateUserLoggedInGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      Auth.currentSession()
        .then(() => {
          this.router.navigate(["/dashboard"]);
          resolve(false);
        })
        .catch(() => resolve(true));
    });
  }
}
