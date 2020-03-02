import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { DashboardContentComponent } from "./dashboard-content/dashboard-content.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.compontent';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  exports: [],
  declarations: [
    DashboardComponent,
    DashboardContentComponent,
    DashboardCardComponent,
    SubscriptionsComponent,
    DashboardSidenavComponent
  ],
  providers: []
})
export class DashboardModule {}
