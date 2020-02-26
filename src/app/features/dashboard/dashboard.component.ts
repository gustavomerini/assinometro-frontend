import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import Auth from "@aws-amplify/auth";
import { Router } from "@angular/router";
import * as Canvas from "./canvas/canvas";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService, private cdr: ChangeDetectorRef) {}
  public showMenu = false;
  public isTotalSubsLoaded = false;

  public menuItems = ["dashboard", "subscriptions", "profile", "logout"];
  public totalSubsFooter = {
    label: this.translate.instant("action_manage"),
    action: () => this.router.navigate(["/subscriptions"])
  };
  public subscriptions = [
    {
      name: "Netflix",
      price: "R$ 15,00"
    },
    {
      name: "Spotify",
      price: "R$ 15,00"
    },
    {
      name: "Vivo Fibra",
      price: "R$ 150,00"
    },
    {
      name: "Sky TV",
      price: "R$ 135,00"
    },
    {
      name: "Oi Fixo",
      price: "R$ 95,00"
    }
  ];

  ngOnInit(): void {
    
    setTimeout(() => this.loadCanvas(), 2500) 
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  loadCanvas() {
    this.isTotalSubsLoaded = true;
    this.cdr.detectChanges() 
    Canvas.addColorSet("customColorSet6", [
      "#6DA700",
      "#67ACBC",
      "#008080",
      "#063951",
      "#400753",
      "#50201F",
      "#EB5B5C",
      "#F5A319"
    ]);

    let chart = new Canvas.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      colorSet: "customColorSet6",
      fontFamily: {
        fontFamily: "Metropolis"
      },
      data: [
        {
          type: "column",
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
