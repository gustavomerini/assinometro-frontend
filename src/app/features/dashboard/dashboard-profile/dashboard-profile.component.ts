import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard-profile",
  templateUrl: "./dashboard-profile.component.html",
  styleUrls: ["./dashboard-profile.component.scss"],
})
export class DashboardProfileComponent implements OnInit {
  user: any;
  isLoaded = true;
  constructor(
    public translate: TranslateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initUserInfo();
  }

  private async initUserInfo() {
    this.user = await this.authService.getUserInfo();
  }
}
