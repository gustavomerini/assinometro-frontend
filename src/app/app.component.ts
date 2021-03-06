import { Component, Inject, LOCALE_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "assinometro-frontend";
  public signedIn = false;
  public user = null;

  constructor(@Inject(LOCALE_ID) private locale: string, private translate: TranslateService) {
    this.translate.setDefaultLang('en-US');
  }

  public async verifyUserSession() {}
}
