import { Database } from 'sqlite3';
export interface GetAlbumsForArtistData {
    AlbumId: number;
    Title: string;
}
export declare class AlbumService {
    private readonly db;
    constructor(db: Database);
    getAlbumsForArtist(artistId: number): Promise<GetAlbumsForArtistData[]>;
}
