import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from "./recovery-password-routing.module";
import { RecoveryPasswordComponent } from './recovery-password.component';
import { EmailStepComponent } from './components/email-step/email-step.component';
import { CodeStepComponent } from './components/code-step/code-step.component';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, SharedModule, LoginRoutingModule],
  exports: [],
  declarations: [RecoveryPasswordComponent, EmailStepComponent, CodeStepComponent],
  providers: []
})
export class RecoveryPasswordModule {}
