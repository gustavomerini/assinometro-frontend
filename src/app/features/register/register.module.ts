import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule,
  ],
  exports: [],
  declarations: [RegisterComponent],
  providers: []
})
export class RegisterModule {}
