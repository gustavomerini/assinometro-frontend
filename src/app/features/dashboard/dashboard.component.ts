import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import Auth from "@aws-amplify/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}
  public showMenu = false;
  public isTotalSubsLoaded = false;

  public menuItems = [
    { route: "dashboard", action: null },
    {
      route: "subscriptions",
      action: () => this.router.navigate(["subscriptions"], {relativeTo: this.activatedRoute})
    },
    { route: "profile", action: null },
    {
      route: "logout",
      action: () => {
        try {
          Auth.signOut();
          this.router.navigate(["/landing-page"]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  ];

  ngOnInit(): void {
    
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
