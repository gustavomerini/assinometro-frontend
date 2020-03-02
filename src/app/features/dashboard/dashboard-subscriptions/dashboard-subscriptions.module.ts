import { NgModule } from "@angular/core";
import { DashboardSubscriptionsComponent } from "./dashboard-subscriptions.component";
import { SubscriptionsPickerComponent } from "./components/subscriptions-picker/subscriptions-picker.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [DashboardSubscriptionsComponent, SubscriptionsPickerComponent],
    providers: [],
})
export class DashboardSubscriptionsModule { }
