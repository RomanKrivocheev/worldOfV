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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const sqlite3_1 = require("sqlite3");
let AlbumService = class AlbumService {
    constructor(db) {
        this.db = db;
    }
    getAlbumsForArtist(artistId) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Album WHERE ArtistId = ?', artistId, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
};
AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sqlite3_1.Database])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map