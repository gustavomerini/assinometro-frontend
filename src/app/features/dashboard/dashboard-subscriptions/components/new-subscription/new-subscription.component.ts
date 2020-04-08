import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-new-subscription",
  templateUrl: "new-subscription.component.html",
  styleUrls: ["new-subscription.component.scss"],
})
export class NewSubscriptionComponent implements OnInit {
  @Input()
  public show = false;
  @Output()
  public onConfirm = new EventEmitter();
  @Output()
  public onClose = new EventEmitter();
  public subForm = this.fb.group({
    subscriptionName: ["", Validators.compose([Validators.required])],
    price: ["", Validators.compose([Validators.required])],
    periodicity: ["", Validators.compose([Validators.required])],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  public addSubscription() {
    this.onConfirm.emit(this.subForm.value);
  }

  public onCancelAction() {
    this.show = false;
    this.onClose.emit();
  }
}
