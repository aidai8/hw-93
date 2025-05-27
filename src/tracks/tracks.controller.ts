import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query, UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('tracks')
export class TracksController {
  constructor(@InjectModel('Track') private trackModel: Model<TrackDocument>) {}

  @Get()
  async getAll(@Query('albumId') albumId?: string) {
    if (albumId) {
      return this.trackModel.find({ album: albumId });
    }
    return this.trackModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackModel.findById({ _id: id });
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    console.log(createTrackDto);
    const track = new this.trackModel({
      track_name: createTrackDto.track_name,
      album: createTrackDto.album,
      duration: createTrackDto.duration,
      isPublished: createTrackDto.isPublished,
    });

    return await track.save();
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.trackModel.findByIdAndDelete(id);
  }
}
