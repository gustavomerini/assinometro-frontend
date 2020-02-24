import { NgModule } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import {
  NegateUserLoggedInGuard,
  UserLoggedInGuard
} from "./services/auth-guard.service";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [LoaderService, NegateUserLoggedInGuard, UserLoggedInGuard]
})
export class CoreModule {}
