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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const track_service_1 = require("./track.service");
const track_model_1 = require("./track.model");
let TrackResolver = class TrackResolver {
    constructor(trackService) {
        this.trackService = trackService;
    }
    async getTracks(input) {
        return this.trackService.getTracks(input);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [track_model_1.Track]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_model_1.GetTracksInput]),
    __metadata("design:returntype", Promise)
], TrackResolver.prototype, "getTracks", null);
TrackResolver = __decorate([
    (0, graphql_1.Resolver)('Track'),
    __metadata("design:paramtypes", [track_service_1.TrackService])
], TrackResolver);
exports.TrackResolver = TrackResolver;
//# sourceMappingURL=track.resolver.js.map