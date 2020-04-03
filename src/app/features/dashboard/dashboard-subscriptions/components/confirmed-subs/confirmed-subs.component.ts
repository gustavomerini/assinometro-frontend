import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-confirmed-subs",
  templateUrl: "confirmed-subs.component.html",
  styleUrls: ["confirmed-subs.component.scss"]
})
export class ConfirmedSubsComponent implements OnInit {
  @Input() subscriptions = [];
  @Output() goBack = new EventEmitter();
  @Output() openModal = new EventEmitter();
  @Output() updatedSub: EventEmitter<Subscription> = new EventEmitter<
    Subscription
  >();

  public periodicity = "Monthly";

  ngOnInit() {
  }

  goBackAction = () => {
    this.goBack.emit();
  };

  openModalAction = () => {
    this.openModal.emit();
  };

  onEdit(isEditing: boolean, index: number) {
    this.subscriptions[index].isEditing = isEditing;
    console.log(isEditing, this.subscriptions[index]);
  }
}
