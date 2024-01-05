import { Args, Query, Resolver } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { GetTracksInput, Track } from './track.model';

@Resolver('Track')
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(returns => [Track])
  async getTracks(@Args('input') input: GetTracksInput): Promise<Track[]> {
    return this.trackService.getTracks(input);
  }
}
