// import {NgModule}            from '@angular/core';
// import {RouterModule}        from '@angular/router';
//
// /* MainComponent */
// import {MainComponent} from './main.component';
//
// @NgModule({
//     imports: [RouterModule.forChild([
//         {path: '', component: MainComponent}
//     ])],
//     exports: [RouterModule]
// })
// export class MainRoutingModule {
// }

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
    { path: '', component: MainComponent }
];

export const MainRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);