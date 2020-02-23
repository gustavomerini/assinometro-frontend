import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "assinometro-frontend";
  public signedIn = false;
  public user = null;

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang("pt");
  }
}
