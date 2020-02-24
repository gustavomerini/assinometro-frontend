import { Component, OnInit } from "@angular/core";
import Auth from "@aws-amplify/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout = () => {
    try {
      Auth.signOut();
      this.router.navigate(["/landing-page"]);
    } catch (error) {
      console.error(error);
    }
  };
}
