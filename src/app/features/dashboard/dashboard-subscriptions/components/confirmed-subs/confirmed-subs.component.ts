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
  public showDeleteModal = false;
  public currentIndex;

  ngOnInit() {
  }

  goBackAction = () => {
    this.goBack.emit();
  };

  openModalAction = () => {
    this.openModal.emit();
  };

  onDelete(index: number) {
    console.log(this.subscriptions[index]);
    this.showDeleteModal = !this.showDeleteModal;
    this.currentIndex = index;
  }

  toggleModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  deleteSubscription() {
    this.subscriptions = this.subscriptions.filter((sub, i) => i !== this.currentIndex);
    this.showDeleteModal = false;
  }

  onEdit(isEditing: boolean, index: number) {
    this.subscriptions[index].isEditing = isEditing;
    console.log(isEditing, this.subscriptions[index]);
  }
}
