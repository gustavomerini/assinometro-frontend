import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { ClarityFormComponent } from './components/clarity-form/clarity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), RouterModule, ClarityModule, FormsModule, ReactiveFormsModule],
  exports: [TranslateModule, ClarityModule, ClarityFormComponent],
  declarations: [ClarityFormComponent],
  providers: []
})
export class SharedModule {}
