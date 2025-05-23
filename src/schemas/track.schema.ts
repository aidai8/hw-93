import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Album, AlbumDocument } from './album.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  track_name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Album.name,
  })
  album: AlbumDocument;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, default: false })
  isPublished: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
