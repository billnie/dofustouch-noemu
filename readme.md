# DofusTouch No-Emu v3 (Angular 2 & Typescript)
##### **/!\ Attention** à la demande de Ankama le fichier script.js n'est plus fourni dans notre repertoire Git. Vous devez donc l'obtenir par votre propre moyen et le placer dans le repertoire src/browser.
Jouer à DofusTouch sans emulateur grâce à un portage entiérement en javascript via [electron](electron github), disponible en open source et cross-platform (OS X, Win, Linux)
#### DofusTouch No-Emu est un [Projet Open Source](http://openopensource.org/)

## À propos
DofusTouch No-Emu fonctionne sur :
 - Windows (32/64 bit)
 - OS X
 - Linux (x86/x86_64)

 ## Installation :
```sh
$ git clone https://github.com/scapain/dofustouch-noemu.git -b angular2-typescript
$ cd dofustouch-noemu
$ npm install
```
## Lancement :
Avancer de lancer electron vous devez compiler les sources typescript via gulp avec la commande :
```sh
$ gulp serve
```
Le script possède un watcher et re-compilera au fur et à mesure des modifications.

Vous pouvez ensuite lancer electron :
```sh
$ npm start
```

## Build Distribution :
à venir...

### Docker :
à venir..

## Développement :
No-Emu est developpé sous angular 2 avec typescript. Il faut distinguer ainsi 2 contexts, celui du navigateur et celui de electron (context node.js).

### Structure des dossiers :

    .
    ├── gulpfile.js                     # contient le script pour gulp (build typescript)
    ├── package.json                    # définition du projet et des packages
    ├── build                           # dossier de sortie des sources javascripts après compilation                   
    ├── src                             # dossier contenant les sources typescript
    │   ├── browser                     # dossier contenant les sources typescript du context client (angular 2)
    │   │   ├── app                     # dossier content l'application angular 2
    │   │   │   ├── game                # component pour une fenêtre de jeu
    │   │   │   ├── shortcuts           # gestion des raccourcis
    │   │   │   └── tab                 # interface de description d'un onglet de jeu
    │   │   ├── game                    # fichiers sources de DofusTouch
    │   │   │   ├── assets
    │   │   │   │   └── ui
    │   │   │   ├── index.html
    │   │   │   ├── script.js
    │   │   │   └── styles-native.css
    │   │   ├── index.html              
    │   │   ├── lumen.css
    │   │   ├── main.ts                 # point d'entré de l'application client
    │   │   ├── styles.css
    │   │   └── systemjs.config.js
    │   └── electron                    # dossier contenant les sources typescript pour electron
    │       ├── application.ts          # coeur de l'application gère les différentes fenêtre et action
    │       ├── default.settings.ts     # contient les paramètres par défaut de l'application
    │       ├── game-menu.template.ts   # décrit le menu d'une fenêtre de jeu
    │       ├── game-window.ts          # class pour chaque instance d'une fenêtre de jeu
    │       ├── main.ts                 # point d'entré de l'application
    │       ├── option-window.ts        # class pour la gestion de la fenêtre option
    │       └── shortcuts.ts            # class de gestion des raccourcis
    ├── tsconfig.json                   # définition typescript
    └── tslint.json


## Todos


License
----

GNU GPLv3 read [LICENCE](https://github.com/scapain/dofustouch-noemu/blob/master/LICENCE)
