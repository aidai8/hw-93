import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../schemas/album.schema';
import { Artist, ArtistSchema } from '../schemas/artist.schema';
import { Track, TrackSchema } from '../schemas/track.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/hw-85'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeedModule {}
