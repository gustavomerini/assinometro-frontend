import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RegisterRoutingModule, SharedModule],
  exports: [],
  declarations: [RegisterComponent],
  providers: [TranslateService]
})
export class RegisterModule {}
