import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-television-form",
  template: `
    <form [formGroup]="televisionForm" class="clr-form clr-form-compact">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input
          [hideLabel]="false"
          [field]="field"
          [parent]="televisionForm"
        ></app-clarity-input>
      </div>
    </form>
  `,
})
export class TelevisionFormComponent implements OnInit {
  public fields = [
    {
      description: this.translate.instant("form_channel_count"),
      name: "channelCount",
      type: "input",
    },
    {
      description: this.translate.instant("form_device_count"),
      name: "deviceCount",
      type: "input",
    },
  ];
  public televisionForm = this.fb.group({
    channelCount: ["", [Validators.required]],
    deviceCount: ["", [Validators.required]],
  });
  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {}
}
