import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';

@Controller('snippets')
export class SnippetsController {
  @Get(':id')
  get(@Param('id') id: string) {
    return id;
  }

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return createSnippetDto;
  }
}
