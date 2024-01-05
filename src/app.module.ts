import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumResolver } from './album.resolver';
import { Database } from 'sqlite3';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    AlbumService,
    AlbumResolver,
    TrackService,
    TrackResolver,
    {
      provide: Database,
      useFactory: () => new Database('chinook.sqlite'),
    },
  ],
})
export class AppModule {}
