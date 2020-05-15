import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-data-analyser",
  templateUrl: "data-analyser.component.html",
  styleUrls: ["data-analyser.component.scss"],
})
export class DataAnalyserComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Input() subscriptions: Subscription[] = [];
  public showDeal = false;
  public currentSub = "";
  constructor() {}

  ngOnInit() {}

  public toggleDeal(subName?: string) {
    this.currentSub = subName;
    this.showDeal = !this.showDeal;
  }

  public goBackAction() {
    this.goBack.emit();
  }
}
