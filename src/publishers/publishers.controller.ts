import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.publishersService.findById(id);
  }

  @Post()
  create(@Body() dto: CreatePublisherDto) {
    return this.publishersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePublisherDto) {
    return this.publishersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.publishersService.remove(id);
  }
}
