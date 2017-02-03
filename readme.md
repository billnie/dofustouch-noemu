# DofusTouch No-Emu v3 (Angular 2 & Typescript)
##### **/!\ Attention** à la demande de Ankama le fichier script.js n'est plus fourni dans notre repertoire Git. Vous devez donc l'obtenir par votre propre moyen et le placer dans le repertoire src/browser.
Jouer à DofusTouch sans emulateur grâce à un portage entiérement en javascript via [electron](electron github), disponible en open source et cross-platform (OS X, Win, Linux)
#### DofusTouch No-Emu est un [Projet Open Source](http://openopensource.org/)

## À propos
DofusTouch No-Emu fonctionne sur :
 - Windows (32/64 bit)
 - OS X
 - Linux (x86/x86_64)
 
## Sommaire
- [À propos](#)
- [Lancement :](#)
- [Build Distribution :](#)
    - [Docker :](#)
- [Développement :](#)
    - [Structure des dossiers :](#)
- [Todos](#)
- [License](#)
 
## Fonctionnalités principales
- Raccourcis en jeu
- Système de notification
- Multi-compte
- Chargement automatique des versions



## Installation :
### Prérequis
#### Node.js :
- Windows : [Website](https://nodejs.org)
- Linux
```sh
apt-get install nodejs
```
- Mac
```sh
brew install nodejs
```

### No-Emu
```sh
$ git clone https://github.com/scapain/dofustouch-noemu.git -b angular2-typescript
$ cd dofustouch-noemu
$ npm install
```
## Utilisation :
Avancer de lancer no-emu vous devez compiler les sources typescript via gulp avec la commande :
```sh
$ gulp serve
```
Le script possède un watcher et re-compilera au fur et à mesure des modifications.

Vous pouvez ensuite lancer no-emu via la commande :
```sh
$ npm run start
```

## Build Distribution :
### Windows
Pour build la distribution de windows vous devez être sous windows (sinon voir plus bas)
```sh
$ npm run build-win
```
#### Docker
Si vous êtes sur mac/linux vous pouvez build une version windows via notre image docker:
```sh
$ docker-compose up
```

### Linux
```sh
$ npm run build-linux
```

### Mac (OS X)
```sh
$ npm run build-mac
```

## Développement :

### Introduction :
No-Emu est developpé sous angular 2 avec typescript. Il faut distinguer ainsi 2 contexts,
 celui du navigateur et celui de electron (context node.js). Le principe est de simuler l'environnement de Dofus Touch pour faire fonctionner ce dernier sur PC.

### Structure des dossiers :
    
    ├── build                         # contient les fichiers utiles pour buid les distributions (icons, etc)                       
    ├── dist                          # dossier de sortie lors de la création des builds
    ├── docker-compose.yml            # fichier de configuration pour docker
    ├── gulpfile.js                   # fichier de configuration de gulp
    ├── node_modules                  # liste des modules npm utilisés par no-emu
    ├── out                           # contient les dossiers Typescript compilé en javascript
    ├── package.json                  # définition du projet et des packages 
    ├── src                           # dossier contenant les sources typescript
    │   ├── browser                   # dossier contenant les sources typescript du context client (angular 2)
    │   │   ├── addons                # dossier contenant les addons (pas encor fonctionnel)
    │   │   ├── app                   # dossier contenant l'application angular 2
    │   │   │   ├── changelog         # dossier contenant le module de la fenêtre changelog
    │   │   │   ├── main              # dossier contenant le component de la fenêtre principale
    │   │   │   │   ├── game          # dossier contenant le component du jeu
    │   │   │   │   └── tab           # dossier contenant les services et objets relatifs aux onglets
    │   │   │   ├── option            # dossier contenant le module de la fenêtre d'option
    │   │   │   │   ├── general       # component pour l'onglet general
    │   │   │   │   ├── notification  # component pour l'onglet notification
    │   │   │   │   └── shortcuts     # component pour l'onglet raccourcis
    │   │   │   │       ├── diver     # component pour le sous onglet diver
    │   │   │   │       ├── input     # component pour la gestion des inputs type raccourcis
    │   │   │   │       ├── interface # component pour le sous onglet interface
    │   │   │   │       ├── item      # component pour le sous onglet item
    │   │   │   │       ├── no-emu    # component pour le sous onglet no-emu
    │   │   │   │       └── spell     # component pour le sous onglet spell
    │   │   │   ├── shortcuts 
    │   │   │   └── update            # dossier contenant le module de la fenêtre d'update
    │   │   ├── index.html            # point d'entré de l'application angular
    │   │   ├── shared                # module partagé en singleton entre les différents module de l'app
    │   │   │   ├── electron          # service pour interagir avec electron
    │   │   │   ├── settings          # service pour la gestion des settings
    │   │   └── systemjs.config.js    # definiton des chargement systemjs de l'app
    │   ├── electron                  # dossier contenant l'application electron
    │   │   ├── application.ts        # coeur de l'application gère les différentes fenêtre et action
    │   │   ├── changelog-window.ts   # objet pour la gestion du changelog
    │   │   ├── default.settings.ts   # contient les paramètres par défaut de l'application
    │   │   ├── game-menu.template.ts # décrit le menu d'une fenêtre de jeu
    │   │   ├── game-window.ts        # objet pour chaque instance d'une fenêtre de jeu
    │   │   ├── main.ts               # point d'entré de l'application
    │   │   ├── option-window.ts      # objet pour la fenêtre d'option
    │   │   ├── shortcuts.ts          # objet pour la gestion des raccourcis
    │   │   └── update-window.ts      # objet pour la fenêtre de l'updater
    │   └── shared
    ├── tsconfig.json                 # définition pour le compilateur typescript
    ├── tslint.json
    └── typings                       # fichier contenant les typages pour les objets JS


License
----

GNU GPLv3 read [LICENCE](https://github.com/scapain/dofustouch-noemu/blob/master/LICENCE)
