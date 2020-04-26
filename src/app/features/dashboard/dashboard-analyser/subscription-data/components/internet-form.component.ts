import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-internet-form",
  template: `
    <form [formGroup]="internetForm" class="clr-form clr-form-compact">
      <div class="form-field" *ngFor="let field of fields">
        <app-clarity-input
          [hideLabel]="false"
          [field]="field"
          [parent]="internetForm"
        ></app-clarity-input>
      </div>
    </form>
  `,
})
export class InternetFormComponent implements OnInit {
  public fields = [
    {
      description: this.translate.instant("form_download_speed"),
      name: "downloadSpeed",
      type: "input",
    },
    {
      description: this.translate.instant("form_upload_speed"),
      name: "uploadSpeed",
      type: "input",
    },
    {
      description: this.translate.instant("form_is_fibra"),
      name: "isFibra",
      type: "input",
    },
  ];
  public internetForm = this.fb.group({
    downloadSpeed: ["", [Validators.required]],
    uploadSpeed: ["", [Validators.required]],
    isFibra: ["", [Validators.required]],
  });
  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {}
}
