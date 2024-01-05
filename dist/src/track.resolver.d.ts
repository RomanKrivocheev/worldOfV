import { TrackService } from './track.service';
import { GetTracksInput, Track } from './track.model';
export declare class TrackResolver {
    private readonly trackService;
    constructor(trackService: TrackService);
    getTracks(input: GetTracksInput): Promise<Track[]>;
}
