import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "dashboard-card",
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
      }
    `
  ],
  template: `
    <div class="card">
      <div class="card-header">
        {{ header }}
      </div>
      <div
        class="card-block"
        [ngClass]="{
          'flex-center': !isLoaded
        }"
      >
        <span *ngIf="!isLoaded; else cardTemplate" class="spinner spinner-md">
        </span>
        <ng-template #cardTemplate>
          <ng-content></ng-content>
        </ng-template>
      </div>
      <div class="card-footer" *ngIf="footer.label">
        <button (click)="footer.action()" class="btn btn-sm btn-link">
          {{ footer.label }}
        </button>
      </div>
    </div>
  `
})
export class DashboardCardComponent implements OnInit {
  @Input() isLoaded = false;
  @Input() header = "";
  @Input() footer: Footer;
  constructor() {}

  ngOnInit() {}
}

export interface Footer {
  label: string;
  action: Function;
}
