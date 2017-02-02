import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';

import {ChangeLogComponent}    from './changelog.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ChangeLogComponent}
    ])],
    exports: [RouterModule]
})
export class ChangeLogRoutingModule {
}
