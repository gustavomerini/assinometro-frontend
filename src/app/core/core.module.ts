import { NgModule } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import {
  NegateUserLoggedInGuard,
  UserLoggedInGuard
} from "./services/auth-guard.service";
import { SubscriptionService } from './subscription/subscription.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [LoaderService, NegateUserLoggedInGuard, UserLoggedInGuard, SubscriptionService]
})
export class CoreModule {}
