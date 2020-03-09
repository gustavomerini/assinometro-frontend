import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-alert",
  styles: [
    `
      .alert-item {
        flex-wrap: nowrap !important;
        .alert-icon-wrapper {
          align-self: center !important;
        }
      }
    `
  ],
  template: `
    <div class="alert" [ngClass]="role" role="alert">
      <div class="alert-items">
        <div class="alert-item static">
          <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" shape="getIcon()"></clr-icon>
          </div>
          <span class="alert-text">{{ message }}</span>
        </div>
      </div>
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

  public getIcon() {
    return this.role === "alert-info" ? "info-circle" : "excelmation-circle";
  }

  public onClose() {
    this.close.emit(true);
  }
}
