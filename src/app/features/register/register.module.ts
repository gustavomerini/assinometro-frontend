import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RegisterRoutingModule],
  exports: [],
  declarations: [RegisterComponent],
  providers: []
})
export class RegisterModule {}
