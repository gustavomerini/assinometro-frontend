import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TranslateModule, ClarityModule, ReactiveFormsModule, FormsModule],
  declarations: [],
  providers: []
})
export class SharedModule {}
