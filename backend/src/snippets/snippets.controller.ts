import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { SnippetsService } from './snippets.service';
import { Snippet } from './entities/snippets.entity';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Snippet> {
    return await this.snippetsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    return await this.snippetsService.create(createSnippetDto);
  }
}
