import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { SubscriptionService } from "src/app/core/subscription/subscription.service";

@Component({
  selector: "dashboard-sidenav",
  styleUrls: ["./dashboard-sidenav.component.scss"],
  template: `
    <nav class="dashboard-sidenav sidenav-items mob-full-size">
      <app-button
        *ngFor="let item of menuItems"
        (onClick)="item.action($event)"
        [label]="item.route + '_page' | translate"
        [classNames]="'btn btn-link clarity-blue-color with-margin-top'"
      ></app-button>
    </nav>
    ,
  `,
})
export class DashboardSidenavComponent {
  @Output() close = new EventEmitter();

  public menuItems = [
    {
      route: "dashboard",
      action: () => {
        this.close.emit(true);
        this.router.navigate(["summary"], {
          relativeTo: this.activatedRoute,
        });
      },
    },
    {
      route: "subscriptions",
      action: () => {
        this.close.emit(true);
        this.router.navigate(["subscriptions"], {
          relativeTo: this.activatedRoute,
        });
      },
    },
    {
      route: "profile",
      action: () => {
        this.close.emit(true);
        this.router.navigate(["profile"], {
          relativeTo: this.activatedRoute,
        });
      },
    },
    {
      route: "logout",
      action: () => {
        this.close.emit(true);
        this.logoutUser();
      },
    },
  ];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private subsService: SubscriptionService,
    private cdr: ChangeDetectorRef
  ) {}

  public closeMenu() {
    this.close.emit(true);
  }

  private async logoutUser() {
    this.subsService.dispatchUserSubscriptions({
      Items: [],
      Count: -1,
      ScannedCount: -1,
    });
    this.cdr.detectChanges();
    const response = await this.authService.logoutUser();
    response && response.code
      ? console.error(response)
      : this.router.navigate(["/landing-page"]);
  }
}
