import { NgModule } from "@angular/core";
import { LoaderService } from "./loader/loader.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader/loader.interceptor';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class CoreModule {}
