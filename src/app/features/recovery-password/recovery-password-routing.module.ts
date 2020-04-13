import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NegateUserLoggedInGuard } from 'src/app/core/services/auth-guard.service';
import { RecoveryPasswordComponent } from './recovery-password.component';

const routes: Routes = [
  {
    path: "",
    component: RecoveryPasswordComponent,
    canActivate: [NegateUserLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
