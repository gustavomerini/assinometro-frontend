import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
  
@NgModule({
    imports: [CommonModule, RegisterRoutingModule],
    exports: [],
    declarations: [RegisterComponent],
    providers: [],
})
export class RegisterModule { }
