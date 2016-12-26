"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../../node_modules/@types/keymaster/index.d.ts" />
var core_1 = require("@angular/core");
//interface Window { key: Keymaster; }
var ShortCutsService = (function () {
    function ShortCutsService() {
    }
    ShortCutsService.prototype.bind = function (shortcut, window, action) {
        window.key('ctrl+a', function () {
            console.log('test a');
        });
    };
    ShortCutsService.prototype.subscribe = function (event) {
    };
    return ShortCutsService;
}());
ShortCutsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ShortCutsService);
exports.ShortCutsService = ShortCutsService;

//# sourceMappingURL=shortcuts.service.js.map