import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { UserLoggedInGuard } from "src/app/core/services/auth-guard.service";
import { DashboardSummaryComponent } from "./dashboard-summary/dashboard-summary.component";
import { DashboardSubscriptionsComponent } from "./dashboard-subscriptions/dashboard-subscriptions.component";
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardAnalyserComponent } from './dashboard-analyser/dashboard-analyser.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "summary"
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "summary",
        component: DashboardSummaryComponent,
        canActivate: [UserLoggedInGuard]
      },
      {
        path: "subscriptions",
        component: DashboardSubscriptionsComponent,
        canActivate: [UserLoggedInGuard]
      },
      {
        path: "analyser",
        component: DashboardAnalyserComponent,
        canActivate: [UserLoggedInGuard],
      },
      {
        path: "profile",
        component: DashboardProfileComponent,
        canActivate: [UserLoggedInGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
