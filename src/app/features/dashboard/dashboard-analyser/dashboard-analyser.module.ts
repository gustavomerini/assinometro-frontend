import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardAnalyserComponent } from "./dashboard-analyser.component";
import { SubscriptionDataModule } from "./subscription-data/subscription-data.module";
import { DataAnalyserDataModule } from './data-analyser/data-analyser.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionDataModule,
    DataAnalyserDataModule
  ],
  exports: [],
  declarations: [DashboardAnalyserComponent],
  providers: [],
})
export class DashboardAnalyserModule {}
