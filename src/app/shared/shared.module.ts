import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClarityModule } from "@clr/angular";
import { AlertComponent } from "./components/alert/alert.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ButtonComponent } from "./components/button/button.component";
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.compontent";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TranslateModule, ClarityModule, CommonModule, AlertComponent, SpinnerComponent, ButtonComponent, DashboardCardComponent],
  declarations: [AlertComponent, SpinnerComponent, ButtonComponent, DashboardCardComponent],
  providers: []
})
export class SharedModule {}
