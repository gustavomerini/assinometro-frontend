import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-button",
  template: `
    <button [clrLoading]="loadingState" [class]="classNames" [type]="type">
      {{ label }}
    </button>
  `
})
export class ButtonComponent implements OnInit {
  @Input()
  public type = "";
  @Input()
  public classNames = "";
  @Input()
  public loadingState = "";
  @Input()
  public label = "";

  constructor() {}

  ngOnInit(): void {}
}
