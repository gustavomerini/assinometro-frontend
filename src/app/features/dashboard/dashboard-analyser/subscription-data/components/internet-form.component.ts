import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-internet-form",
  template: `
    <form class="clr-form clr-form-compact" (ngSubmit)="(onSubmitAction)">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input-bind
          [hideLabel]="false"
          [field]="field"
          [value]="subscription"
        ></app-clarity-input-bind>
      </div>
    </form>
  `,
})
export class InternetFormComponent implements OnInit {
  @Input() fields;
  @Input() subscription: Subscription;
  @Output() onSubmitAction = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
