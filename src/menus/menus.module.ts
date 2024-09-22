import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cafe } from 'src/cafes/entities/cafe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, User, Cafe])],
  controllers: [MenusController],
  providers: [MenusService, JwtAuthGuard],
  exports: [MenusService],
})
export class MenusModule {}
