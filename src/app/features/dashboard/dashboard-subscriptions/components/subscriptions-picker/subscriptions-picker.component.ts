import { Component, OnInit, Input, Output } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { TranslateService } from "@ngx-translate/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-subscriptions-picker",
  styleUrls: ["subscriptions-picker.component.scss"],
  templateUrl: "subscriptions-picker.component.html"
})
export class SubscriptionsPickerComponent implements OnInit {
  @Output() confirmSubs: EventEmitter<Subscription[]> = new EventEmitter<
    Subscription[]
  >();
  @Input() subscriptions: Subscription[];
  public subsPickerFooter = {
    label: this.translate.instant("confirm"),
    action: () => this.goForwardAction()
  };

  public filteredSubs = [];
  public selectedSubs = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subscriptions = this.subscriptions.map(sub => ({...sub, selected: false}));
  }

  public toggleSubscription(subscription) {
    const name = subscription.subscriptionName;
    if (this.selectedSubs.find(sub => sub.subscriptionName === name)) {
      this.selectedSubs = this.selectedSubs.filter(
        sub => sub.subscriptionName !== name
      );
      subscription.selected = false;
      return;
    }
    this.selectedSubs.push(subscription);
    subscription.selected = true;
  }

  public onInput(value: string) {
    this.filteredSubs = this.subscriptions.filter(
      sub =>
        sub.subscriptionName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) === 0
    );
  }

  public goForwardAction() {
    this.confirmSubs.emit(this.selectedSubs);
    this.filteredSubs = [];
    this.subscriptions = this.subscriptions.map(sub => ({...sub, selected: false}));
  }
}
