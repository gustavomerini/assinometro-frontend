import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-data-analyser",
  templateUrl: "data-analyser.component.html",
  styleUrls: ["data-analyser.component.scss"],
})
export class DataAnalyserComponent implements OnInit {
  @Input() subscriptions: Subscription[] = [];
  public showDeal = false;
  public currentSub = "";
  constructor() {}

  ngOnInit() {}

  public toggleDeal(subName?: string) {
    this.currentSub = subName;
    this.showDeal = !this.showDeal;
  }
}
