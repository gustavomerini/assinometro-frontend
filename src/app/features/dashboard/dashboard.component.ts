import { Component, OnInit } from "@angular/core";
import Auth from "@aws-amplify/auth";
import { Router } from "@angular/router";
import * as Canvas from "./canvas/canvas";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  public showMenu = false;

  ngOnInit(): void {
    this.loadCanvas();
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  loadCanvas() {
    Canvas.addColorSet("customColorSet6", [
      // "#ADE500",
      "#6DA700",
      "#67ACBC",
      "#008080",
      "#063951",
      "#400753",
      "#50201F",
      "#EB5B5C",
      "#F5A319"
    ]);
    // "#003D79",
    // "#004D8A",
    // "#0065AB",
    // "#0079B8",
    // "#0095D3",
    // "#89CBDF",
    // "#49AFD9",
    // "#A3EDF6",
    // "#89CBDF",
    // "#A6D8E7",

    let chart = new Canvas.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      colorSet: "customColorSet6",
      data: [
        {
          type: "column",
          showInLegend: true,
          legendMarkerColor: "grey",
          legendText: "Reais R$",
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

  logout = () => {
    try {
      Auth.signOut();
      this.router.navigate(["/landing-page"]);
    } catch (error) {
      console.error(error);
    }
  };
}
