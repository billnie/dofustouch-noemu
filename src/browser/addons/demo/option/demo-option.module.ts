import {NgModule}           from '@angular/core';

import {DemoRoutingModule}   from './demo-routing-option.module';
import {DemoComponent}    from './demo-option.component';

@NgModule({
    declarations: [DemoComponent],
    imports: [DemoRoutingModule],
})
export class DemoModule {
}
