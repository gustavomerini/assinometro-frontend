import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-confirmed-subs",
  templateUrl: "confirmed-subs.component.html",
  styleUrls: ["confirmed-subs.component.scss"],
})
export class ConfirmedSubsComponent implements OnInit {
  @Input() subscriptions = [];
  @Output() goBack = new EventEmitter();
  @Output() openModal = new EventEmitter();
  @Output() onSave = new EventEmitter();
  public showDeleteModal = false;
  public currentIndex;
  public options = [
    {
      label: this.translate.instant("monthly"),
      value: "MONTHLY",
    },
    {
      label: this.translate.instant("weekly"),
      value: "WEEKLY",
    },
    {
      label: this.translate.instant("annually"),
      value: "ANNUALLY",
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  goBackAction = () => {
    this.goBack.emit();
  };

  openModalAction = () => {
    this.openModal.emit();
  };

  onDelete(index: number) {
    this.showDeleteModal = !this.showDeleteModal;
    this.currentIndex = index;
  }

  toggleModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  deleteSubscription() {
    this.subscriptions = this.subscriptions.filter(
      (sub, i) => i !== this.currentIndex
    );
    this.showDeleteModal = false;
  }

  onEdit(isEditing: boolean, index: number) {
    this.subscriptions[index].isEditing = isEditing;
  }

  saveSubscriptionsAction() {
    this.onSave.emit(this.subscriptions);
  }
}
