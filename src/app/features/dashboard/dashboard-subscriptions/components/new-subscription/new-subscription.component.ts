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
    frequency: ["", Validators.compose([Validators.required])],
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

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngAfterViewInit() {}

  public addSubscription() {
    if (this.subForm.invalid) {
      this.clrForm.markAsTouched();
      return;
    }
    this.onConfirm.emit(this.subForm.value);
  }

  public onCancelAction() {
    this.show = false;
    this.onClose.emit();
  }
}
