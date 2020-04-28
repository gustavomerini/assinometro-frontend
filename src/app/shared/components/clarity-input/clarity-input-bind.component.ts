import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from "src/app/core/services/field/field";

@Component({
  selector: "app-clarity-input-bind",
  template: `
    <section>
      <section [ngSwitch]="field.type">
        <section *ngSwitchCase="'input'">
          <clr-input-container>
            <label
              [ngClass]="hideLabel ? 'hide-label clr-sr-only' : 'show-label'"
              >{{ field.description }}</label
            >
            <input
              clrInput
              class="clr-col-12"
              [(ngModel)]="value.ext[field.name]"
              [placeholder]="field.description"
            />

            <clr-control-error *clrIfError="'required'">{{
              "form_" + field.name + "_required" | translate
            }}</clr-control-error>
          </clr-input-container>
        </section>
        <section *ngSwitchDefault>
          <clr-password-container>
            <label
              [ngClass]="hideLabel ? 'hide-label clr-sr-only' : 'show-label'"
              >{{ field.description }}</label
            >
            <input
              clrPassword
              class="clr-col-12"
              [name]="field.name"
              [(ngModel)]="value.ext[field.name]"
              [placeholder]="field.description"
            />
            <clr-control-error *clrIfError="'required'">{{
              "form_" + field.name + "_required" | translate
            }}</clr-control-error>
            <clr-control-error *clrIfError="'strongPassword'">{{
              "form_strong_password" | translate
            }}</clr-control-error>
            <clr-control-error *clrIfError="'mustMatch'">{{
              "form_must_match" | translate
            }}</clr-control-error>
          </clr-password-container>
        </section>
      </section>
    </section>
  `,
  styles: [
    `
      .hide-label {
        display: none !important;
      }
    `,
  ],
})
export class ClarityInputBindComponent {
  @Input() field: Field;
  @Input() value: any;
  @Input() hideLabel = true;
  constructor() {}
}
