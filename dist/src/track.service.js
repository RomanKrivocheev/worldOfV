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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const sqlite3_1 = require("sqlite3");
let TrackService = class TrackService {
    constructor(db) {
        this.db = db;
    }
    getTracks({ artistName, genreName, minPrice, maxPrice, page, pageSize, }) {
        const query = `
      SELECT
        t.TrackId AS id,
        t.Name AS name,
        t.UnitPrice AS price,
        t.Milliseconds AS duration,
        g.Name AS genre
      FROM Track t
      JOIN Genre g ON t.GenreId = g.GenreId
      JOIN Album a ON t.AlbumId = a.AlbumId
      JOIN Artist ar ON a.ArtistId = ar.ArtistId
      WHERE
        ar.Name = ?
        AND g.Name = ?
        AND t.UnitPrice >= ?
        AND t.UnitPrice < ?
      LIMIT ? OFFSET ?
    `;
        const offset = page * pageSize;
        return new Promise((resolve, reject) => {
            this.db.all(query, [artistName, genreName, minPrice, maxPrice, pageSize, offset], (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
    async getTracksByIds(ids) {
        const query = `
      SELECT
        t.TrackId AS id,
        t.Name AS name,
        t.UnitPrice AS price,
        t.Milliseconds AS duration,
        g.Name AS genre
      FROM Track t
      JOIN Genre g ON t.GenreId = g.GenreId
      WHERE t.TrackId IN (${ids.join(',')})
    `;
        return new Promise((resolve, reject) => {
            this.db.all(query, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
};
TrackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sqlite3_1.Database])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map