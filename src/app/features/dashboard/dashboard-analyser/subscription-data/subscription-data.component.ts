import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import { Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Pipe, PipeTransform } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-subscription-data",
  templateUrl: "subscription-data.component.html",
  styleUrls: ["subscription-data.component.scss"],
})
export class SubscriptionDataComponent {
  @Input() subscriptions: Subscription[] = [];
  @Output() onClick = new EventEmitter();

  public internetFields = [
    {
      description: this.translate.instant("form_download_speed"),
      name: "downloadSpeed",
      type: "number",
    },
    {
      description: this.translate.instant("form_upload_speed"),
      name: "uploadSpeed",
      type: "number",
    },
    {
      description: this.translate.instant("form_is_fibra"),
      name: "isFibra",
      type: "checkbox",
    },
  ];
  public internetForm = this.fb.group({
    downloadSpeed: ["", [Validators.required]],
    uploadSpeed: ["", [Validators.required]],
    isFibra: ["", [Validators.required]],
  });

  public mobileFields = [
    {
      description: this.translate.instant("form_gb_quantity"),
      name: "gbQuantity",
      type: "number",
    },
    {
      description: this.translate.instant("form_has_unlimited_internet_app"),
      name: "hasUnlimitedInternetApp",
      type: "checkbox",
    },
    {
      description: this.translate.instant("unlimited_calls_brasil"),
      name: "unlimitedCallsBrasil",
      type: "checkbox",
    },
  ];
  public mobileForm = this.fb.group({
    gbQuantity: ["", [Validators.required]],
    hasUnlimitedInternetApp: ["", [Validators.required]],
    unlimitedCallsBrasil: ["", [Validators.required]],
  });

  public phoneFields = [
    {
      description: this.translate.instant("all_mobile_calls"),
      name: "unlimitedMobileCalls",
      type: "checkbox",
    },
    {
      description: this.translate.instant("all_calls"),
      name: "unlimitedPhoneCalls",
      type: "checkbox",
    },
    {
      description: this.translate.instant("all_operators"),
      name: "allOperators",
      type: "checkbox",
    },
  ];
  public phoneForm = this.fb.group({
    unlimitedMobileCalls: ["", [Validators.required]],
    unlimitedPhoneCalls: ["", [Validators.required]],
    allOperators: ["", [Validators.required]],
  });

  public televisionFields = [
    {
      description: this.translate.instant("form_channel_count"),
      name: "channelCount",
      type: "number",
    },
    {
      description: this.translate.instant("form_device_count"),
      name: "deviceCount",
      type: "number",
    },
  ];
  public televisionForm = this.fb.group({
    channelCount: ["", [Validators.required]],
    deviceCount: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private router: Router
  ) {}

  public onClickAction() {
    this.onClick.emit(this.subscriptions);
  }

  public redirectToSubscriptions() {
    this.router.navigate(["dashboard/summary"]);
  }
}
