import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

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

      .card-header {
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      .actions {
        margin-left: auto;
      }

      .card-block {
        overflow: auto;
      }
    `,
  ],
  template: `
    <style></style>
    <div class="card">
      <div *ngIf="header" class="card-header">
        <img *ngIf="logo" [src]="logo" class="card-logo" />
        {{ header }}
        <div class="actions" *ngIf="rightButton">
          <button
            type="button"
            (click)="rightButtonAction()"
            class="btn btn-icon"
            aria-label="home"
          >
            <clr-icon [attr.shape]="rightButtonIcon"></clr-icon>
          </button>
          <button
            type="button"
            *ngIf="isEditing"
            (click)="onDeleteAction()"
            class="btn btn-icon"
            aria-label="home"
          >
            <clr-icon shape="times"></clr-icon>
          </button>
        </div>
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
  `,
})
export class DashboardCardComponent implements OnInit {
  @Input() isLoaded = false;
  @Input() header = "";
  @Input() footer: Footer;
  @Input() logo = "";
  @Input() rightButton: boolean;
  @Output() onClick = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  public rightButtonIcon = "pencil";
  public isEditing = false;
  constructor() {}

  ngOnInit() {}

  onDeleteAction() {
    this.onDelete.emit();
  }

  rightButtonAction() {
    this.isEditing = !this.isEditing;
    this.rightButtonIcon = this.isEditing ? "check" : "pencil";
    this.onClick.emit(this.isEditing);
  }
}

export interface Footer {
  label: string;
  action: () => void;
}

export interface Button {
  icon: string;
  action: (isEditing: boolean) => void;
}
