import { NgModule } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import {
  NegateUserLoggedInGuard,
  UserLoggedInGuard,
} from "./services/auth-guard.service";
import { SubscriptionService } from "./subscription/subscription.service";
import { UserService } from "./services/user/user.service";
import { AuthenticationService } from "./services/authentication.service";
import { AnalyserService } from "./services/analyser/analyser.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    LoaderService,
    NegateUserLoggedInGuard,
    UserLoggedInGuard,
    SubscriptionService,
    UserService,
    AnalyserService,
    AuthenticationService,
  ],
})
export class CoreModule {}
