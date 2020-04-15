import { Component, OnInit, Input } from "@angular/core";
                                                                                                               
@Component({
  selector: "dashboard-subscription-items",
  styles: [
    `
      .card-media-title {
        font-weight: 700;
        text-transform: capitalize;
      }

      .card-media-description {
        justify-content: center !important;
      }
    `,
  ],
  template: `
    <section style="height: 45vh; width: 100%;  max-width: 100%;">
      <div
        class="card-media-block with-align card-overflow"
        *ngFor="let sub of subscriptions"
      >
        <img
          [src]="
            'assets/images/subscriptions/' +
            sub.subscriptionName.toLowerCase() +
            '.png'
          "
          class="card-media-image"
        />
        <div class="card-media-description">
          <span class="card-media-title">
            {{ sub.subscriptionName }}
          </span>
          <span class="card-media-text"> R$ {{ sub.price }} </span>
        </div>
      </div>
    </section>
  `,
})
export class DashboardSubscriptionItems implements OnInit {
  @Input() subscriptions = [];
  constructor() {}

  ngOnInit() {}
}
