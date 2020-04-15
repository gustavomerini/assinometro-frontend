import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardProfileComponent } from './dashboard-profile.component';

@NgModule({
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [DashboardProfileComponent],
    providers: [],
})
export class DashboardProfileModule { }
