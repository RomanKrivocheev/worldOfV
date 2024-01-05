import { AlbumService } from './album.service';
import { Album } from './album.model';
export declare class AlbumResolver {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAlbumsForArtist(artistId: number): Promise<Album[]>;
}
