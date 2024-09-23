import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class seed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      const seedUsers = [
        {
          username: 'superadmin',
          fullname: 'Super Admin',
          password: await argon2.hash('password123'),
          role: UserRole.superadmin,
        },
        {
          username: 'owner1',
          fullname: 'Owner One',
          password: await argon2.hash('password123'),
          role: UserRole.owner,
        },
        {
          username: 'manager1',
          fullname: 'Manager One',
          password: await argon2.hash('password123'),
          role: UserRole.manager,
        },
      ];

      await this.userRepository.save(seedUsers); // Save users to DB
      console.log('Seed data created successfully.');
    } else {
      console.log('Users already exist. Skipping seed.');
    }
  }
}
