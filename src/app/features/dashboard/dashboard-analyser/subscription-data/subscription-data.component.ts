import { Component, Input } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-subscription-data",
  templateUrl: "subscription-data.component.html",
  styleUrls: ["subscription-data.component.scss"],
})
export class SubscriptionDataComponent {
  @Input() subscriptions: Subscription[] = [];
}
