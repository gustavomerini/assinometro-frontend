import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-alert",
  template: `
    <div class="alert" [ngClass]="role" role="alert">
      <div class="alert-items">
        <div class="alert-item static">
          <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" shape="info-circle"></clr-icon>
          </div>
          <span class="alert-text">{{ message }}</span>
        </div>
      </div>
      <button
        type="button"
        (click)="onClose()"
        class="close"
        aria-label="Close"
      >
        <clr-icon aria-hidden="true" shape="close"></clr-icon>
      </button>
    </div>
  `
})
export class AlertComponent {
  @Input()
  public message = "";
  @Input()
  public role = "";
  @Output()
  public close = new EventEmitter();

  constructor() {}

  public onClose() {
    this.close.emit(true);
  }
}
