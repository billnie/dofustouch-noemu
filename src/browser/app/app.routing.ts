import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'main', pathMatch: 'full'
    },
    {
        path: 'option',
        loadChildren: './app/option/option.module#OptionModule'
    },
    {
        path: 'changelog',
        loadChildren: './app/changelog/changelog.module#ChangeLogModule'
    },
    {
        path: 'update',
        loadChildren: './app/update/update.module#UpdateModule'
    },
    {
        path: 'main',
        loadChildren: './app/main/main.module#MainModule'
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});