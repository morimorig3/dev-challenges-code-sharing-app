import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsController } from './snippets/snippets.controller';
import { SnippetsService } from './snippets/snippets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [],
        synchronize: true, // 本番環境ではfalse
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, SnippetsController],
  providers: [AppService, SnippetsService],
})
export class AppModule {}
