import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  selector: "app-modal",
  template: `
    <div class="modal" *ngIf="show">
      <div class="modal-dialog" role="dialog" aria-hidden="true">
        <div class="modal-content">
          <div class="modal-header">
            <button
              (click)="onCancelAction()"
              aria-label="Close"
              class="close"
              type="button"
            >
              <clr-icon aria-hidden="true" shape="close"></clr-icon>
            </button>
            <h3 class="modal-title">{{ header }}</h3>
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <button (click)="onCancelAction()" class="btn btn-sm btn-link">
              {{ "cancel" | translate }}
            </button>
            <button (click)="onConfirmAction()" class="btn btn-sm btn-primary">
              {{ label }}
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop" aria-hidden="true"></div>
    </div>
  `,
})
export class AppModalComponent implements OnInit, AfterViewInit {
  @Input() show = false;
  @Input() header = "";
  @Input() message: string;
  @Input() label: string;
  @Output() onConfirm = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public onConfirmAction() {
    this.onConfirm.emit();
  }

  public onCancelAction() {
    this.onCancel.emit();
  }
}
