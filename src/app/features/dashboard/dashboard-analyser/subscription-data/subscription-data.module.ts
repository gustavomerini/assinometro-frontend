import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SubscriptionDataComponent } from "./subscription-data.component";
import { SharedModule } from "src/app/shared/shared.module";
import { InternetFormComponent } from "./components/internet-form.component";
import { TelevisionFormComponent } from "./components/television.component";
import { MobilePhoneFormComponent } from "./components/mobile-phone-form.component";
@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [SubscriptionDataComponent],
  declarations: [
    SubscriptionDataComponent,
    InternetFormComponent,
    TelevisionFormComponent,
    MobilePhoneFormComponent,
  ],
  providers: [],
})
export class SubscriptionDataModule {}
