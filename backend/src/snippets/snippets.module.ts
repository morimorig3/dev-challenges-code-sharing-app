import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './entities/snippets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class SnippetsModule {}
