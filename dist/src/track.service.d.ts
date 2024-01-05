import { Database } from 'sqlite3';
import { GetTracksInput } from './track.model';
import { Track } from './track.model';
export declare class TrackService {
    private readonly db;
    constructor(db: Database);
    getTracks({ artistName, genreName, minPrice, maxPrice, page, pageSize, }: GetTracksInput): Promise<Track[]>;
    getTracksByIds(ids: number[]): Promise<Track[]>;
}
