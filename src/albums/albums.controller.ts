import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { albumStorage } from '../multer.config';

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
  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
