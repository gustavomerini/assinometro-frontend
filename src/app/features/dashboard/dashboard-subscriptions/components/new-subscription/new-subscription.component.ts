import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-new-subscription',
    templateUrl: 'new-subscription.component.html',
    styleUrls: ['new-subscription.component.scss'],
})

export class NewSubscriptionComponent implements OnInit {
    public show = false;
    @Output() onConfirm = new EventEmitter;
    constructor() { }

    ngOnInit() { }
    
    public onConfirmAction() {
        this.onConfirm.emit();
    }

    public onCancelAction() {

    }
}