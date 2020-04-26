import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-data-analyser",
  templateUrl: "data-analyser.component.html",
  styleUrls: ["data-analyser.component.scss"],
})
export class DataAnalyserComponent implements OnInit {
  @Input() subscriptions: Subscription[] = [];
  constructor() {}

  ngOnInit() {}
}
