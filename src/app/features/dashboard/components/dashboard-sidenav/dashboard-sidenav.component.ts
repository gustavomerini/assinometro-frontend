import { Component, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Auth from "@aws-amplify/auth";
import { AuthenticationService } from 'src/app/core/services/authentication.service';

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
    {
      route: "dashboard",
      action: () =>
        this.router.navigate(["summary"], {
          relativeTo: this.activatedRoute
        })
    },
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
      action: () => this.logoutUser()
    }
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {}

  public closeMenu() {
    this.close.emit(true);
  }

  private async logoutUser() {
      const response = await this.authService.logoutUser();
      response && response.code ? console.error(response) : this.router.navigate(["/landing-page"]);
  }
}
