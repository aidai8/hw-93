import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  artist_name: string;

  @Prop({ default: null, type: String })
  image: string | null;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  isPublished: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
