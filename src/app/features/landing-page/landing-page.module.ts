import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page.component";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [],
  declarations: [LandingPageComponent],
  providers: []
})
export class LandingPageModule {}
