import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-button",
  template: `
    <button
      [clrLoading]="loadingState"
      (click)="onClickButton($event)"
      [class]="classNames"
      [type]="type"
    >
      {{ label }}
    </button>
  `
})
export class ButtonComponent implements OnInit {
  @Output()
  public onClick = new EventEmitter();
  @Input()
  public type = "text";
  @Input()
  public classNames = "";
  @Input()
  public loadingState = "";
  @Input()
  public label = "";

  onClickButton(event) {
    this.onClick.emit(event);
  }

  constructor() {}

  ngOnInit(): void {}
}
