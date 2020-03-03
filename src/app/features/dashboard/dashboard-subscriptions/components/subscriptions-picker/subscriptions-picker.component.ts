import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  public toggleSubscription(subscription) {
    const name = subscription.name;
    if (this.selectedSubs.find(sub => sub === name)) {
      this.selectedSubs = this.selectedSubs.filter(sub => sub !== name);
      document.getElementById(name).classList.remove("selected");
      return;
    }
    this.selectedSubs.push(name);
    document.getElementById(name).classList.add("selected");
  }

  public onInput(value: string) {
    this.filteredSubs = this.subscriptions.filter(
      sub =>
        sub.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0
    );
  }

  private confirmSubscriptions() {
    console.log(this.selectedSubs);
  }
}
