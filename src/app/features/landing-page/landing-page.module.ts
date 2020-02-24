import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from "./landing-page.component";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [],
  declarations: [LandingPageComponent],
  providers: []
})
export class LandingPageModule {}
