import { Module } from '@nestjs/common';
import { CafesService } from './cafes.service';
import { CafesController } from './cafes.controller';
import { Cafe } from './entities/cafe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe, User])],
  controllers: [CafesController],
  providers: [CafesService, JwtAuthGuard],
  exports: [CafesService],
})
export class CafesModule {}
