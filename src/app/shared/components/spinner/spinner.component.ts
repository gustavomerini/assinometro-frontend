import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/core/services/loader.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-spinner",
  template: `
    <span *ngIf="isLoading | async" class="spinner spinner-inverse"></span>
  `
})
export class SpinnerComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}
}
