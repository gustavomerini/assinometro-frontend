import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { SubscriptionService, AWSResponse } from "src/app/core/subscription/subscription.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)"
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(-100%, 0, 0)"
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out"))
    ])
  ]
})
export class DashboardComponent implements OnInit {
  constructor(private subsService: SubscriptionService) {}

  public isTotalSubsLoaded = false;
  public menuState = "out";

  ngOnInit() {
    this.subsService.fetchSubscriptions().subscribe((subs: AWSResponse<Subscription[]>) => {
      this.subsService.updateSubscriptions(subs);
      this.isTotalSubsLoaded = true;
    });
  }

  public toggleMenu() {
    this.menuState = this.menuState === "out" ? "in" : "out";
  }

  public closeMenu() {
    this.menuState = "out";
  }
}
