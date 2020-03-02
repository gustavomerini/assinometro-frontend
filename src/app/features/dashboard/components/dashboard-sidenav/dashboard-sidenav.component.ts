import { Component, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Auth from "@aws-amplify/auth";

@Component({
  selector: "dashboard-sidenav",
  styleUrls: ["./dashboard-sidenav.component.scss"],
  template: `
    <nav class="dashboard-sidenav sidenav-items mob-full-size">
      <app-button
        *ngFor="let item of menuItems"
        [action]="item.action"
        [label]="item.route + '_page' | translate"
        [classNames]="'btn btn-link clarity-blue-color with-margin-top'"
      ></app-button>
    </nav>
    ,
  `
})
export class DashboardSidenavComponent {
  @Output() close = new EventEmitter();

  public menuItems = [
    { route: "dashboard", action: null },
    {
      route: "subscriptions",
      action: () =>
        this.router.navigate(["subscriptions"], {
          relativeTo: this.activatedRoute
        })
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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public closeMenu() {
    this.close.emit(true);
  }
}
