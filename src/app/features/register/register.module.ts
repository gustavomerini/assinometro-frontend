import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule, 
    FormsModule,
    RegisterRoutingModule
  ],
  exports: [],
  declarations: [RegisterComponent],
  providers: []
})
export class RegisterModule {}
