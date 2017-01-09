import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';

/* MainComponent */
import {MainComponent} from './main.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: MainComponent}
    ])],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
