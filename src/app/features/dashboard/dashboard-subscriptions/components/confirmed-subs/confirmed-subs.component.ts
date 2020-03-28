import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'src/app/core/subscription/subscription';

@Component({
  selector: "app-confirmed-subs",
  templateUrl: "confirmed-subs.component.html",
  styleUrls: ["confirmed-subs.component.scss"]
})
export class ConfirmedSubsComponent {
    @Input() subscriptions = [];
    @Output() goBack = new EventEmitter();
    @Output() addSubscription = new EventEmitter(); 
    @Output() updatedSub: EventEmitter<Subscription> = new EventEmitter<Subscription>();

    goBackAction = () => {
        this.goBack.emit()
    }
}
