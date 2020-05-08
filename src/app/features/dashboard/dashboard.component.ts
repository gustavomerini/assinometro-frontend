import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Subscription } from "src/app/core/subscription/subscription";
import * as config from "src/config.json";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)",
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(-100%, 0, 0)",
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out")),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  constructor(
    private subsService: SubscriptionService,
    private authService: AuthenticationService
  ) {}

  public isTotalSubsLoaded = false;
  public showAnalyseButton = false;
  public menuState = "out";

  ngOnInit() {
    this.authService.getUserInfo().then((response) => {
      this.subsService
        .fetchSubscriptions()
        .subscribe((response: AWSResponse<Subscription[]>) => {
          this.subsService.updateSubscriptions(response);
        });
      this.subsService
        .fetchUserSubscriptions(response.username)
        .subscribe((response: AWSResponse<Subscription[]>) => {
          this.subsService.dispatchUserSubscriptions(response);
        });
    });
  }

  public toggleMenu() {
    this.menuState = this.menuState === "out" ? "in" : "out";
  }

  public closeMenu() {
    this.menuState = "out";
  }
}
