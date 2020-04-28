import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClarityModule } from "@clr/angular";
import { AlertComponent } from "./components/alert/alert.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ButtonComponent } from "./components/button/button.component";
import { DashboardCardComponent } from "./components/dashboard-card/dashboard-card.compontent";
import { AppModalComponent } from "./components/app-modal/app-modal.component";
import { AuthFormComponent } from "./components/auth-form/auth.form.component";
import { ClarityInputComponent } from "./components/clarity-input/clarity-input.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ClarityInputBindComponent } from "./components/clarity-input/clarity-input-bind.component";
import { FilterPipe } from "./pipes/filter-pipe";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    TranslateModule,
    ClarityModule,
    CommonModule,
    AlertComponent,
    SpinnerComponent,
    ButtonComponent,
    DashboardCardComponent,
    AppModalComponent,
    AuthFormComponent,
    TimelineComponent,
    ClarityInputComponent,
    ClarityInputBindComponent,
    FilterPipe,
  ],
  declarations: [
    AlertComponent,
    SpinnerComponent,
    ButtonComponent,
    DashboardCardComponent,
    AppModalComponent,
    TimelineComponent,
    AuthFormComponent,
    ClarityInputBindComponent,
    ClarityInputComponent,
    FilterPipe,
  ],
  providers: [FilterPipe],
})
export class SharedModule {}
