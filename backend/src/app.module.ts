import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsController } from './snippets/snippets.controller';

@Module({
  imports: [],
  controllers: [AppController, SnippetsController],
  providers: [AppService],
})
export class AppModule {}
