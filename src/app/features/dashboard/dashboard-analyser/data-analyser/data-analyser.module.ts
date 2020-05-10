import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { BetterDealsComponent } from "./better-deals/better-deals.component";
import { DealInformationComponent } from "./better-deals/components/deal-information.component";
import { DataAnalyserComponent } from "./data-analyser.component";
@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [DataAnalyserComponent],
  declarations: [
    BetterDealsComponent,
    DealInformationComponent,
    DataAnalyserComponent,
  ],
  providers: [],
})
export class DataAnalyserDataModule {}
