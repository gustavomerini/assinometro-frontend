import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input()
  public message = "";
  @Input()
  public role = "";
  @Output()
  public close = new EventEmitter();

  constructor() { }

  public onClose() {
    this.close.emit(true);
  }
}
