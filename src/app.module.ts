import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumsController } from './albums/albums.controller';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { TracksController } from './tracks/tracks.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/hw-85'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
    ]),
  ],
  controllers: [AppController, ArtistsController, AlbumsController, TracksController],
  providers: [AppService],
})
export class AppModule {}
