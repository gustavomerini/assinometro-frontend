import { Injectable } from "@angular/core";
import { User } from "./user/user";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import { AWSUserData } from "./user/userData";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  userData: AWSUserData;
  constructor() {}

  async loginUser(user: User) {
    try {
      return await Auth.signIn(user);
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async registerUser(user: User) {
    try {
      return await Auth.signUp(user);
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async logoutUser() {
    try {
      this.userData = null;
      return await Auth.signOut();
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async sendRecoveryEmail(email: string) {
    try {
      return await Auth.forgotPassword(email);
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async changePasswordByRecoveryCode(
    email: string,
    code: string,
    newPassword: string
  ) {
    try {
      return await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async changePasswordByAuthentication(
    user: CognitoUser,
    oldPassword: string,
    newPassword: string
  ) {
    try {
      return await Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }

  async getUserInfo(): Promise<AWSUserData> {
    try {
      const response = this.userData
        ? this.userData
        : await Auth.currentAuthenticatedUser();
      this.userData = response;
      return this.userData;
    } catch (error) {
      return new Promise((resolve) => resolve(error));
    }
  }
}
