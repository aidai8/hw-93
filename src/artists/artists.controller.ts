import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistDocument } from '../schemas/artist.schema';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { artistStorage } from '../multer.config';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel('Artist') private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistModel.find({ _id: id });
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: artistStorage }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    const artist = new this.artistModel({
      artist_name: createArtistDto.artist_name,
      description: createArtistDto.description,
      image: file ? '/uploads/artists/' + file.filename : null,
      isPublished: createArtistDto.isPublished,
    });

    return artist.save();
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.artistModel.findByIdAndDelete(id);
  }
}
