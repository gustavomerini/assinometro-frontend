import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardAnalyserComponent } from "./dashboard-analyser.component";
import { SubscriptionDataModule } from "./subscription-data/subscription-data.module";
import { DataAnalyserComponent } from "./data-analyser/data-analyser.component";

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionDataModule,
  ],
  exports: [],
  declarations: [DashboardAnalyserComponent, DataAnalyserComponent],
  providers: [],
})
export class DashboardAnalyserModule {}
