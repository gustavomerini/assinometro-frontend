import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from "./landing-page.component";
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageFeaturesComponent } from './components/landing-page-features/landing-page-features.component';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [],
  declarations: [LandingPageComponent, LandingPageFeaturesComponent],
  providers: []
})
export class LandingPageModule {}
