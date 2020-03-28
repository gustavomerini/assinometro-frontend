import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "dashboard-card",
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
      }

      .card-logo {
        max-width: 36px;
        max-height: 36px;
        margin-right: 0.5rem !important;
      }

      .card-block {
        overflow: auto;
      }
    `
  ],
  template: `
    <div class="card">
      <div *ngIf="header" class="card-header">
        <img *ngIf="logo" [src]="logo" class="card-logo" />
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
      <div class="card-footer" *ngIf="footer && isLoaded">
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
  @Input() logo = "";
  constructor() {}

  ngOnInit() {
    console.log(performance.now(), this.isLoaded);
  }
}

export interface Footer {
  label: string;
  action: () => void;
}
