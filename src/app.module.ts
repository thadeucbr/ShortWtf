import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'development',
      database: 'devUrl',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
