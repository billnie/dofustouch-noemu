import {NgModule}           from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from './../../shared/shared.module';

import {ChangeLogRoutingModule}   from './changelog-routing.module';
import {ChangeLogComponent}    from './changelog.component';


@NgModule({
    declarations: [ChangeLogComponent],
    imports: [
        SharedModule,
        ChangeLogRoutingModule,
        NgbModule.forRoot()
    ],
})
export class ChangeLogModule {
}
