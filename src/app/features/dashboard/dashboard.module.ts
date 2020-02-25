import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardCardComponent } from './components/dashboard-card.compontent';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, DashboardRoutingModule],
    exports: [],
    declarations: [DashboardComponent, DashboardCardComponent],
    providers: [],
})
export class DashboardModule { }
