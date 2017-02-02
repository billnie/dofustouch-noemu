import {Component, OnInit} from '@angular/core';
import { SettingsService } from './../../../shared/settings/settings.service';

@Component({
    selector: 'option-notification',
    templateUrl: 'app/option/notification/notification.component.html',
    styleUrls: ['app/option/notification/notification.component.css'],
    host: {

    }
})
export class NotificationComponent implements OnInit{

    constructor(
        private settingsService: SettingsService
    ){

    }

    ngOnInit(): void {


    }

}
