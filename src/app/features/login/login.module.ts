import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";
import { ChildrenLoginComponent } from "./children/children.component";
import { LoginRoutingModule } from "./login-routing.module";
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, LoginRoutingModule],
  exports: [RouterModule],
  declarations: [LoginComponent, ChildrenLoginComponent],
  providers: [TranslateService]
})
export class LoginModule {}
