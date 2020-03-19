import { Component } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

const IMG_PREFIX = "assets/images/landing-page/";
@Component({
  selector: "app-landing-page-features",
  styleUrls: ["landing-page-features.component.scss"],
  templateUrl: "landing-page-features.component.html"
})
export class LandingPageFeaturesComponent {
  landingPageItems = [
    {
      header: "easy_to_use",
      subheader: "easy_to_use_description",
      img: `${IMG_PREFIX}visual_data.svg`
    },
    {
      header: "stop_worring",
      subheader: "stop_worring_description",
      img: `${IMG_PREFIX}netflix.svg`
    },
    {
      header: "open_source",
      subheader: "open_source_description",
      img: `${IMG_PREFIX}open_source.svg`
    },
  ]
  constructor(private translate: TranslateService) {}
}
