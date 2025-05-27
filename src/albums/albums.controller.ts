import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { albumStorage } from '../multer.config';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}
  @Get()
  getAlbums(@Query('artistId') artistId: string) {
    if (artistId) {
      return this.albumModel.find({ artist: artistId });
    }
    return this.albumModel.find();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.find({ _id: id });
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: albumStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      album_name: albumDto.album_name,
      artist: albumDto.artist,
      year: albumDto.year,
      image: file ? '/uploads/albums/' + file.filename : null,
      isPublished: albumDto.isPublished,
    });

    return await album.save();
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
