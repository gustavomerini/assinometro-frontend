import { NgModule } from "@angular/core";
import { DashboardSubscriptionsComponent } from "./dashboard-subscriptions.component";
import { SubscriptionsPickerComponent } from "./components/subscriptions-picker/subscriptions-picker.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ConfirmedSubsComponent } from './components/confirmed-subs/confirmed-subs.component';
import { NewSubscriptionComponent } from './components/new-subscription/new-subscription.component';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [DashboardSubscriptionsComponent, SubscriptionsPickerComponent, ConfirmedSubsComponent, NewSubscriptionComponent],
    providers: [],
})
export class DashboardSubscriptionsModule { }
