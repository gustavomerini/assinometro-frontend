import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./features/landing-page/landing-page.component";

const routes: Routes = [
  { path: "", redirectTo: "landing-page", pathMatch: "full" },
  {
    path: "landing-page",
    component: LandingPageComponent
  },
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./features/register/register.module").then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
