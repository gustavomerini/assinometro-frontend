import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-new-subscription",
  templateUrl: "new-subscription.component.html",
  styleUrls: ["new-subscription.component.scss"],
})
export class NewSubscriptionComponent implements AfterViewInit {
  @ViewChild("clrForm", { static: true }) clrForm;
  @Input()
  public show = false;
  @Output()
  public onConfirm = new EventEmitter();
  @Output()
  public onClose = new EventEmitter();
  public subForm = this.fb.group({
    subscriptionName: ["", Validators.compose([Validators.required])],
    price: ["", Validators.compose([Validators.required])],
    type: ["", Validators.compose([Validators.required])],
    frequency: ["", Validators.compose([Validators.required])],
    logo: ["assinometro.png"],
  });
  public options = [
    {
      label: this.translate.instant("monthly"),
      value: "MONTHLY",
    },
    {
      label: this.translate.instant("weekly"),
      value: "WEEKLY",
    },
    {
      label: this.translate.instant("annually"),
      value: "ANNUALLY",
    },
  ];

  public types = [
    {
      label: this.translate.instant("internet_description"),
      value: "INTERNET",
    },
    {
      label: this.translate.instant("television_description"),
      value: "TELEVISION",
    },
    {
      label: this.translate.instant("phone_description"),
      value: "PHONE",
    },
    {
      label: this.translate.instant("mobile_description"),
      value: "MOBILE",
    },
    {
      label: this.translate.instant("streaming_description"),
      value: "STREAMING",
    },
    {
      label: this.translate.instant("games_description"),
      value: "GAMES",
    },
    {
      label: this.translate.instant("other_description"),
      value: "OTHER",
    },
  ];

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngAfterViewInit() {}

  public addSubscription() {
    if (this.subForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    const newSub = { ...this.subForm.value };
    newSub.ext = {};
    this.onConfirm.emit(newSub);
  }

  public onCancelAction() {
    this.show = false;
    this.onClose.emit();
  }
}
