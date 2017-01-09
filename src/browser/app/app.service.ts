import { Injectable } from '@angular/core';


@Injectable()
export class AppService {

    public load(): void {
        console.log('init app service');
    }

}