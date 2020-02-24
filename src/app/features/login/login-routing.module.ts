import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ChildrenLoginComponent } from "./children/children.component";
import { NegateUserLoggedInGuard } from 'src/app/core/services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [NegateUserLoggedInGuard]
  },
  {
      path: ":id",
      component: ChildrenLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
