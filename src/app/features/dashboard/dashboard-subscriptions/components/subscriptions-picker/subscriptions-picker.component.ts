import { Component, OnInit, Input, ViewChild, ElementRef, Output } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-subscriptions-picker",
  styleUrls: ["subscriptions-picker.component.scss"],
  templateUrl: "subscriptions-picker.component.html"
})
export class SubscriptionsPickerComponent implements OnInit {
  @Input() subscriptions: Subscription[];
  public filteredSubs = [];
  public selectedSubs = [];
  public subsPickerFooter = {
    label: this.translate.instant("confirm_action"),
    action: () => this.confirmSubscriptions()
  };
  @Output() confirmSubs: EventEmitter<Subscription[]> = new EventEmitter<Subscription[]>();

  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  public toggleSubscription(subscription) {
    const name = subscription.subscriptionName;
    if (this.selectedSubs.find(sub => sub.subscriptionName === name)) {
      this.selectedSubs = this.selectedSubs.filter(sub => sub.subscriptionName !== name);
      subscription.selected = false;
      return;
    }
    this.selectedSubs.push(subscription);
    subscription.selected = true;
  }

  public onInput(value: string) {
    this.filteredSubs = this.subscriptions.filter(
      sub =>
        sub.subscriptionName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
    );
  }

  private confirmSubscriptions() {
    this.confirmSubs.emit(this.selectedSubs);
  }
}
