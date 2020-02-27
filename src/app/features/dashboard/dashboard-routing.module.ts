import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { UserLoggedInGuard } from "src/app/core/services/auth-guard.service";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { DashboardContentComponent } from "./dashboard-content/dashboard-content.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "summary"
  },
  {
    path: "",
    component: DashboardComponent,
    canActivate: [UserLoggedInGuard],
    children: [
      {
        path: "summary",
        component: DashboardContentComponent,
        canActivate: [UserLoggedInGuard]
      },
      {
        path: "subscriptions",
        component: SubscriptionsComponent,
        canActivate: [UserLoggedInGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
