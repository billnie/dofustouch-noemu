import {NgModule}           from '@angular/core';

import {DemoRoutingModule}   from './demo-routing.module';
import {DemoComponent}    from './demo.component';

@NgModule({
    declarations: [DemoComponent],
    imports: [DemoRoutingModule],
})
export class DemoModule {
}
