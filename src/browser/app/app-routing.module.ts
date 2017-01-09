import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: 'main',
            loadChildren: 'app/app/main/main.module#MainModule'
        },
        {
            path: 'option',
            loadChildren: 'app/app/option/option.module#OptionModule'
        },
        {
            path: 'update',
            loadChildren: 'app/app/update/update.module#UpdateModule'
        },
        {
            path: 'demo',
            loadChildren: 'addons/demo/demo.module#DemoModule'
        },
        {
            path: '',
            redirectTo: '/main',
            pathMatch: 'full'
        }
    ], {useHash: true}) // hack to work routing on electron
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
