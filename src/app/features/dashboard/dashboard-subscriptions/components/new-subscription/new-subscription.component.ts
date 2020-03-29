import { Component, OnInit, Input } from '@angular/core';
import { Footer } from 'src/app/shared/components/dashboard-card/dashboard-card.compontent';

@Component({
    selector: 'app-new-subscription',
    templateUrl: 'new-subscription.component.html',
    styleUrls: ['new-subscription.component.scss'],
})

export class NewSubscriptionComponent implements OnInit {
    @Input() isLoaded = false;
    @Input() show = false;
    @Input() header = "";
    @Input() footer: Footer;
    constructor() { }

    ngOnInit() { }
}