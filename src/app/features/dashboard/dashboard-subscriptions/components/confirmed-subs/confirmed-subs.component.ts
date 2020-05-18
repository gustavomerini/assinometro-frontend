import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
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
  @Output() onDeleteSubscription = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  public showDeleteModal = false;
  public currentIndex;
  public types = [
    {
      label: this.translate.instant("internet_description"),
      value: "INTERNET",
    },
    {
      label: this.translate.instant("television_description"),
      value: "TELEVISION",
    },
    {
      label: this.translate.instant("phone_description"),
      value: "PHONE",
    },
    {
      label: this.translate.instant("mobile"),
      value: "MOBILE",
    },
    {
      label: this.translate.instant("streaming_description"),
      value: "STREAMING",
    },
    {
      label: this.translate.instant("games_description"),
      value: "GAMES",
    },
    {
      label: this.translate.instant("health_description"),
      value: "HEALTH",
    },
    {
      label: this.translate.instant("cloud_description"),
      value: "NÚVEM",
    },
    {
      label: this.translate.instant("prod_description"),
      value: "PRODUCTIVITY",
    },
    {
      label: this.translate.instant("other_description"),
      value: "OTHER",
    },
  ];
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
    this.subscriptions.forEach((sub) => (sub.isEditing = false));
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

  onDeleteAction() {
    this.onDeleteSubscription.emit(this.currentIndex);
    this.showDeleteModal = false;
  }

  onEdit(isEditing: boolean, index: number) {
    this.subscriptions[index].isEditing = isEditing;
  }

  saveSubscriptionsAction() {
    this.onSave.emit(this.subscriptions);
  }

  cancel() {
    this.subscriptions.forEach((sub) => (sub.isEditing = false));
    this.onCancel.emit(true);
  }
}
