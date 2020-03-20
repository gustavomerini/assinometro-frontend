import { Injectable } from "@angular/core";
import { User } from "./user/user";
import Auth from "@aws-amplify/auth";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor() {}

  async loginUser(user: User) {
    try {
      return await Auth.signIn(user);
    } catch (error) {
      return new Promise(resolve => resolve(error));
    }
  }

  async registerUser(user: User) {
    try {
      return await Auth.signUp(user);
    } catch (error) {
      return new Promise(resolve => resolve(error));
    }
  }

  async logoutUser() {
    try {
      return await Auth.signOut();
    } catch (error) {
      return new Promise(resolve => resolve(error));
    }
  }

  async getUserInfo() {
    try {
      return await Auth.currentUserInfo();
    } catch (error) {
      return new Promise(resolve => resolve(error));
    }
  }
}
