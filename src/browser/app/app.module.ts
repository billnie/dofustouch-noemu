import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import {SharedModule} from '../shared/shared.module';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {APP_BASE_HREF} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'} // hack to work routing on electron
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
