import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seed } from './seed.service'; // Ensure this points to your seed service
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [seed],
})
export class SeedModule {}
