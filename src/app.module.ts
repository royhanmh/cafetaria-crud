import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CafesModule } from './cafes/cafes.module';
import { Cafe } from './cafes/entities/cafe.entity';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/entities/menu.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Cafe, Menu],
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 5,
      },
    ]),
    UsersModule,
    CafesModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Add ThrottlerGuard globally
    },
  ],
})
export class AppModule {}
