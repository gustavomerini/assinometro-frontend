import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardAnalyserComponent } from "./dashboard-analyser.component";
import { SubscriptionDataComponent } from "./subscription-data/subscription-data.component";

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  exports: [],
  declarations: [DashboardAnalyserComponent, SubscriptionDataComponent],
  providers: [],
})
export class DashboardAnalyserModule {}
