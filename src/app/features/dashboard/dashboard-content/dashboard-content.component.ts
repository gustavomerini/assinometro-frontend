import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Canvas from "../canvas/canvas";

@Component({
  selector: "dashboard-content",
  styles: [
    `
      .average-cost {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .highlight-price {
        font-weight: 500;
        font-size: 1rem;
      }

      .with-align {
        align-items: center;
      }

      .total-subs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    `
  ],
  templateUrl: "dashboard-content.component.html"
})
export class DashboardContentComponent implements OnInit {
  public totalSubsFooter = {
    label: this.translate.instant("action_manage"),
    action: () => this.router.navigate(["/subscriptions"])
  };

  chartTypes = ["area", "line", "column"];
  counter = 0;

  public subscriptions = [
    {
      name: "Netflix",
      price: "R$ 15,00"
    },
    {
      name: "Vivo",
      price: "R$ 150,00"
    },
    {
      name: "Spotify",
      price: "R$ 15,00"
    },
    {
      name: "Kindle",
      price: "R$ 30,00"
    },
    {
      name: "Oi",
      price: "R$ 95,00"
    }
  ];
  public isTotalSubsLoaded = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => this.loadCanvas(), 2500);
  }

  loadCanvas() {
    const type = this.chartTypes[this.counter];
    this.counter >= 2 ? (this.counter = 0) : this.counter++;
    this.isTotalSubsLoaded = true;
    this.cdr.detectChanges();
    Canvas.addColorSet("customColorSet6", [
      "#49AFD9",
      "#C1CDD4",
      "#0065AB",
      "#25333D",
      "#A6D8E7",
      "#798893"
    ]);

    let chart2 = new Canvas.Chart("chartContainer2", {
      theme: "light2",
      animationEnabled: true,
      colorSet: "customColorSet6",
      fontFamily: {
        fontFamily: "Metropolis"
      },
      data: [
        {
          type: "doughnut",
          dataPoints: [
            { y: 15, label: "Netflix" },
            { y: 145, label: "Vivo" },
            { y: 55, label: "Oi" },
            { y: 80, label: "Sky" },
            { y: 15, label: "Spotify" }
          ]
        }
      ]
    });
    chart2.render();
    let chart = new Canvas.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      colorSet: "customColorSet6",
      fontFamily: {
        fontFamily: "Metropolis"
      },
      data: [
        {
          type: type,
          dataPoints: [
            { y: 140, label: "January" },
            { y: 130, label: "February" },
            { y: 115, label: "March" },
            { y: 150, label: "April" },
            { y: 160, label: "May" },
            { y: 160, label: "June" },
            { y: 150, label: "July" },
            { y: 145, label: "August" },
            { y: 120, label: "September" },
            { y: 135, label: "October" },
            { y: 140, label: "November" },
            { y: 160, label: "December" }
          ]
        }
      ]
    });

    chart.render();
  }
}