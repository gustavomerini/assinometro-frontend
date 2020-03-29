import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  template: `
    <clr-modal [(clrModalOpen)]="show">
      <h3 class="modal-title">{{ header }}</h3>
      <div class="modal-body">
        <ng-template #modalTemplate>
          <ng-content></ng-content>
        </ng-template>
      </div>
      <div class="modal-footer">
        <button (click)="(footer.action)" class="btn btn-sm btn-link">
          {{ footer.label }}
        </button>
      </div>
    </clr-modal>
  `
})
export class AppModalComponent implements OnInit {
  @Input() show = false;
  @Input() header = "";
  @Input() footer: Footer;
  constructor() {}

  ngOnInit() {}
}

export interface Footer {
  label: string;
  action: () => void;
}
