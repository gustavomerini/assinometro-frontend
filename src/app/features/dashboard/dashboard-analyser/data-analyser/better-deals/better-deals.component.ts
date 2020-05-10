import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-better-deals",
  templateUrl: "better-deals.component.html",
  styleUrls: ["better-deals.component.scss"],
})
export class BetterDealsComponent implements AfterViewInit {
  @Input() betterDeals: Subscription[];
  @Output() goBack = new EventEmitter();
  constructor() {}

  ngAfterViewInit() {
      console.log(this.betterDeals);
  }

  goBackAction() {
      this.goBack.emit();
  }
}
