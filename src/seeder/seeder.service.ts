import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Track, TrackDocument } from '../schemas/track.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async seed() {
    console.log('Starting database seeding ...');

    await this.artistModel.deleteMany();
    await this.albumModel.deleteMany();
    await this.trackModel.deleteMany();

    console.log('Collections cleared');

    const [billieEilish, queen] = await this.artistModel.create([
      {
        artist_name: 'Billie Eilish',
        image: 'fixtures/billie.jpeg',
        description:
          'Billie Eilish Pirate Baird Connell (born December 18, 2001) is an American singer-songwriter and musician.',
        isPublished: true,
      },
      {
        artist_name: 'Queen',
        image: 'fixtures/queen.jpeg',
        description:
          'Queen is a British band that is considered one of the greatest rock bands in history.',
        isPublished: true,
      },
    ]);

    const [whenWeAllFallAsleep, happierThanEver] = await this.albumModel.create(
      [
        {
          album_name: 'When We All Fall Asleep, Where Do We Go?',
          artist: billieEilish._id,
          year: 2019,
          image: 'fixtures/whenWeAllFallAsleep.jpeg',
          isPublished: true,
        },

        {
          album_name: 'Happier Than Ever',
          artist: billieEilish._id,
          year: 2021,
          image: 'fixtures/happierThanEver.jpeg',
          isPublished: true,
        },
      ],
    );

    const [aNightAtTheOpera, theGame] = await this.albumModel.create([
      {
        album_name: 'A Night at the Opera',
        artist: queen._id,
        year: 1975,
        image: 'fixtures/nightAtOpera.jpeg',
        isPublished: true,
      },
      {
        album_name: 'The Game',
        artist: queen._id,
        year: 1980,
        image: 'fixtures/theGame.jpeg',
        isPublished: true,
      },
    ]);

    await this.trackModel.create([
      {
        track_name: 'bad guy',
        album: whenWeAllFallAsleep._id,
        duration: '3:14',
        number: 1,
        isPublished: true,
      },
      {
        track_name: 'xanny',
        album: whenWeAllFallAsleep._id,
        duration: '4:04',
        number: 2,
        isPublished: true,
      },
      {
        track_name: 'you should see me in a crown',
        album: whenWeAllFallAsleep._id,
        duration: '3:01',
        number: 3,
        isPublished: true,
      },
      {
        track_name: 'all the good girls go to hell',
        album: whenWeAllFallAsleep._id,
        duration: '2:49',
        number: 4,
        isPublished: true,
      },
      {
        track_name: 'wish you were gay',
        album: whenWeAllFallAsleep._id,
        duration: '3:42',
        number: 5,
        isPublished: true,
      },
    ]);

    await this.trackModel.create([
      {
        track_name: 'Getting Older',
        album: happierThanEver._id,
        duration: '4:04',
        number: 1,
        isPublished: true,
      },
      {
        track_name: "I Didn't Change My Number",
        album: happierThanEver._id,
        duration: '2:38',
        number: 2,
        isPublished: true,
      },
      {
        track_name: 'Billie Bossa Nova',
        album: happierThanEver._id,
        duration: '3:16',
        number: 3,
        isPublished: true,
      },
      {
        track_name: 'my future',
        album: happierThanEver._id,
        duration: '3:30',
        number: 4,
        isPublished: true,
      },
      {
        track_name: 'Oxytocin',
        album: happierThanEver._id,
        duration: '3:30',
        number: 5,
        isPublished: true,
      },
    ]);

    await this.trackModel.create([
      {
        track_name: 'Death on Two Legs',
        album: aNightAtTheOpera._id,
        duration: '3:43',
        number: 1,
        isPublished: true,
      },
      {
        track_name: 'Lazing on a Sunday Afternoon',
        album: aNightAtTheOpera._id,
        duration: '1:08',
        number: 2,
        isPublished: true,
      },
      {
        track_name: "I'm in Love with My Car",
        album: aNightAtTheOpera._id,
        duration: '3:05',
        number: 3,
        isPublished: true,
      },
      {
        track_name: "You're My Best Friend",
        album: aNightAtTheOpera._id,
        duration: '2:50',
        number: 4,
        isPublished: true,
      },
      {
        track_name: 'Bohemian Rhapsody',
        album: aNightAtTheOpera._id,
        duration: '5:55',
        number: 5,
        isPublished: true,
      },
    ]);

    await this.trackModel.create([
      {
        track_name: 'Play the Game',
        album: theGame._id,
        duration: '3:30',
        number: 1,
        isPublished: true,
      },
      {
        track_name: 'Dragon Attack',
        album: theGame._id,
        duration: '4:18',
        number: 2,
        isPublished: true,
      },
      {
        track_name: 'Another One Bites the Dust',
        album: theGame._id,
        duration: '3:36',
        number: 3,
        isPublished: true,
      },
      {
        track_name: 'Need Your Loving Tonight',
        album: theGame._id,
        duration: '2:48',
        number: 4,
        isPublished: true,
      },
      {
        track_name: 'Crazy Little Thing Called Love',
        album: theGame._id,
        duration: '2:43',
        number: 5,
        isPublished: true,
      },
    ]);
    console.log('Seeding database completed!');
  }
}
