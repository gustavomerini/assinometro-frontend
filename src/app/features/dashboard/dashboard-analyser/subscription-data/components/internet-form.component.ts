import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-internet-form",
  template: `
    <form [formGroup]="form" class="clr-form clr-form-compact">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input
          [hideLabel]="false"
          [field]="field"
          [parent]="form"
        ></app-clarity-input>
      </div>
    </form>
  `,
})
export class InternetFormComponent implements OnInit {
  @Input() form;
  @Input() fields;
  constructor() {}

  ngOnInit() {}
}
