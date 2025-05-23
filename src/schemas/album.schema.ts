import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  album_name: string;

  @Prop({ required: true })
  artist: string;
  @Prop({ required: true })
  year: number;
  @Prop({ default: null, type: String })
  image: string | null;
  @Prop({ required: true })
  isPublished: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
