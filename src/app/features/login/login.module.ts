import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from "./login.component";
import { ChildrenLoginComponent } from "./children/children.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  exports: [],
  declarations: [LoginComponent, ChildrenLoginComponent],
  providers: []
})
export class LoginModule {}
