import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";
import { ChildrenLoginComponent } from "./children/children.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  imports: [CommonModule, LoginRoutingModule],
  exports: [RouterModule],
  declarations: [LoginComponent, ChildrenLoginComponent],
  providers: []
})
export class LoginModule {}
