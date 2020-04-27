import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SubscriptionDataComponent } from "./subscription-data.component";
import { SharedModule } from "src/app/shared/shared.module";
import { InternetFormComponent } from "./components/internet-form.component";
@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [SubscriptionDataComponent],
  declarations: [SubscriptionDataComponent, InternetFormComponent],
  providers: [],
})
export class SubscriptionDataModule {}
