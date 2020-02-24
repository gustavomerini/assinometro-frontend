import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { UserLoggedInGuard } from 'src/app/core/services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [UserLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
