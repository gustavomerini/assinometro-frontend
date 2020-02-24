import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import Auth from "@aws-amplify/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "assinometro-frontend";
  public signedIn = false;
  public user = null;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang("pt");
    this.verifyUserSession();
  }

  public async verifyUserSession() {
    try {
      const response = await Auth.currentSession();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
