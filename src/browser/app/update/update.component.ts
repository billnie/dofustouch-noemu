import {Component, OnInit, NgZone}      from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IpcRendererService} from "../../../shared/electron/ipcrenderer.service";


const progress = (<any>global).nodeRequire('request-progress');
const request = (<any>global).nodeRequire('request');
const fs = (<any>global).nodeRequire('fs');

@Component({
    moduleId: module.id,
    selector: 'update',
    templateUrl: 'update.component.html',
    styleUrls: ['update.component.css']
})
export class UpdateComponent implements OnInit {

    private progress: number = 0;
    private savePath: string;
    private saveFile: any;
    private remoteUrl: string;
    private informations: string = 'Début du téléchargement...';
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private zone: NgZone,
                private ipcRendererService: IpcRendererService) {
    }

    download() {
        progress(request(this.remoteUrl), {})
            .on('progress', (state: any) => {
                this.zone.run(() => {
                    this.progress = Math.round(state.percent * 100);
                    this.informations = this.formatUnit(state.size.transferred) + ' / ' + this.formatUnit(state.size.total);
                });
            })
            .on('error', (err: any) => {
                this.zone.run(() => {
                    this.informations = '<span class="text-error">Impossible de télécharger la mise à jour ! Veuillez réessayer ultérieurement</span>';
                });
            })
            .on('end', () => {
                this.zone.run(() => {
                    this.progress = 100;
                    this.informations = 'Mise à jour terminée';
                });
            })
            .pipe(this.saveFile);

        this.saveFile.addListener('finish', () => {
            this.install();
        });
    }

    install() {
        this.informations = 'Installation de la mis à jour...';

        // call electron to install the update
        this.ipcRendererService.send('install-update');
    }

    formatUnit(count: number): string {
        if (count >= 1000000) {
            return (Math.round((count / 1000000) * 100) / 100) + ' Mb';
        }
        else if (count >= 1000) {
            return (Math.round((count / 1000) * 100) / 100) + ' Kb';
        }
        else {
            return (Math.round(count * 100) / 100) + ' B';
        }
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.savePath = decodeURIComponent(params['savePath']);
                this.remoteUrl = decodeURIComponent(params['remoteUrl']);


                this.saveFile = fs.createWriteStream(this.savePath);

                this.download();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
