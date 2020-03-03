import { Component, OnInit } from "@angular/core";
import { subscriptions } from "src/app/core/subscription/subscriptions";

@Component({
  selector: "app-dashboard-subscriptions",
  templateUrl: "./dashboard-subscriptions.component.html",
  styleUrls: ["./dashboard-subscriptions.component.scss"]
})
export class DashboardSubscriptionsComponent implements OnInit {
  public subscriptions = subscriptions;
  constructor() {}

  ngOnInit(): void {}
}
