import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';

import {UpdateComponent}    from './update.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: ':savePath/:remoteUrl', component: UpdateComponent}
    ])],
    exports: [RouterModule]
})
export class UpdateRoutingModule {
}
