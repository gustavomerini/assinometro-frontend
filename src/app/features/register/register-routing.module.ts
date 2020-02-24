import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NegateUserLoggedInGuard } from "src/app/core/services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: RegisterComponent,
    canActivate: [NegateUserLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
