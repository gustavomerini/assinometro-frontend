import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-deal-information",
  templateUrl: "deal-information.component.html",
  styleUrls: ["deal-information.component.scss"],
})
export class DealInformationComponent implements OnInit {
  @Input() fields;
  @Input() subscription: Subscription;
  @Output() onSubmitAction = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.onSubmitAction.emit();
  }
}
