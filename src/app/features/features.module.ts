import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LandingPageModule } from "./landing-page/landing-page.module";

const routes: Routes = [
  { path: "", redirectTo: "landing-page", pathMatch: "full" },
  {
    path: "landing-page",
    component: LandingPageComponent
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LandingPageModule],
  exports: [RouterModule],
  declarations: []
})
export class FeaturesModule {}
