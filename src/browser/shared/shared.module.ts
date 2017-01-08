import { NgModule } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { IpcRendererService } from './electron/ipcrenderer.service';

@NgModule({
    providers: [
        SettingsService,
        IpcRendererService
    ],
})
export class SharedModule {}
