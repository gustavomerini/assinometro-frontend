import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  constructor() {
    console.log("landing bootstrap");
  }

  public showMenu = false;
  ngOnInit(): void {}

  public toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu)
  }
}
