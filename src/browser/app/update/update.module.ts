import {NgModule}           from '@angular/core';

import {UpdateRoutingModule}   from './update-routing.module';
import {UpdateComponent}    from './update.component';

@NgModule({
    declarations: [UpdateComponent],
    imports: [UpdateRoutingModule],
})
export class UpdateModule {
}
