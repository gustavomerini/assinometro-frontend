import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardCardComponent } from './components/dashboard-card.compontent';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [CommonModule, SharedModule, DashboardRoutingModule],
    exports: [],
    declarations: [DashboardComponent, DashboardContentComponent, DashboardCardComponent, SubscriptionsComponent],
    providers: [],
})
export class DashboardModule { }
