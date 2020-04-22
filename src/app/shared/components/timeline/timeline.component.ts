import { Component, Input } from "@angular/core";

@Component({
  selector: "app-timeline",
  template: `
    <div class="center">
      <ul class="clr-timeline">
        <li
          class="clr-timeline-step"
          *ngFor="let option of options; let optionIndex = index"
        >
          <clr-icon
            [attr.shape]="optionIndex === index ? 'dot-circle' : option.state"
            aria-current="true"
            aria-label="Current"
          ></clr-icon>
          <div class="clr-timeline-step-body">
            <span class="clr-timeline-step-title">{{ option.label }}</span>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .center {
        display: flex;
        justify-content: center;
      }
      .clr-timeline {
        max-width: 80vw;
      }
    `,
  ],
})
export class TimelineComponent {
  @Input() options: TimelineOption[];
  @Input() index: number;
  constructor() {}
}

export interface TimelineOption {
  state: string;
  label: string;
}
