import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardSidenavComponent } from "./components/dashboard-sidenav/dashboard-sidenav.component";
import { DashboardSummaryComponent } from "./dashboard-summary/dashboard-summary.component";
import { DashboardSubscriptionsModule } from "./dashboard-subscriptions/dashboard-subscriptions.module";
import { DashboardSubscriptionItems } from './dashboard-summary/components/dashboard-subscription-items.component';

@NgModule({
  imports: [CommonModule, SharedModule, DashboardSubscriptionsModule, DashboardRoutingModule],
  exports: [],
  declarations: [
    DashboardComponent,
    DashboardSummaryComponent,
    DashboardSidenavComponent,
    DashboardSubscriptionItems
  ],
  providers: [
    
  ]
})
export class DashboardModule {}
