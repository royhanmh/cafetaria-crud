import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from './entities/cafe.entity';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class CafesService {
  constructor(
    @InjectRepository(Cafe)
    private cafeRepository: Repository<Cafe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCafe(createCafeDto: CreateCafeDto): Promise<Cafe> {
    const owner = await this.userRepository.findOne({
      where: { id: createCafeDto.ownerId },
    });
    const manager = await this.userRepository.findOne({
      where: { id: createCafeDto.managerId },
    });

    if (!owner || !manager) {
      throw new NotFoundException('User not found');
    }

    if (owner.role !== UserRole.owner) {
      throw new ForbiddenException('User is not an owner');
    }
    if (manager.role !== UserRole.manager) {
      throw new ForbiddenException('User is not an manager');
    }

    const isManaging = await this.isManagerManagingCafe(
      createCafeDto.managerId,
    );
    if (isManaging) {
      throw new ConflictException('Manager is already managing a cafe');
    }

    const cafe = this.cafeRepository.create(createCafeDto);
    return this.cafeRepository.save(cafe);
  }

  async getCafes(): Promise<Cafe[]> {
    return this.cafeRepository.find();
  }

  async getCafeById(id: number): Promise<Cafe> {
    return this.cafeRepository.findOne({ where: { id } });
  }

  async updateCafe(
    id: number,
    updateCafeDto: UpdateCafeDto,
    userId: number,
    userRole: UserRole, // Add the user's role as a parameter
  ): Promise<Cafe> {
    // Fetch the cafe to check ownership and existence
    const cafe = await this.cafeRepository.findOne({ where: { id } });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (userRole == UserRole.owner && cafe.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to update this cafe');
    }

    if (updateCafeDto.ownerId) {
      const owner = await this.userRepository.findOne({
        where: { id: updateCafeDto.ownerId },
      });

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }

      if (owner.role !== UserRole.owner) {
        throw new ForbiddenException('The new user is not an owner');
      }
    }

    if (updateCafeDto.managerId) {
      const manager = await this.userRepository.findOne({
        where: { id: updateCafeDto.managerId },
      });
      const isManaging = await this.isManagerManagingCafe(
        updateCafeDto.managerId,
      );
      if (!manager) {
        throw new NotFoundException('Manager not found');
      }

      if (manager.role !== UserRole.manager) {
        throw new ForbiddenException('The new user is not an manager');
      }

      if (isManaging) {
        throw new ConflictException('Manager is already managing a cafe');
      }
    }

    // Update the cafe
    await this.cafeRepository.update(id, updateCafeDto);

    return this.getCafeById(id);
  }

  async deleteCafe(
    id: number,
    userId: number,
    userRole: UserRole,
  ): Promise<void> {
    const cafe = await this.cafeRepository.findOne({ where: { id } });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (userRole == UserRole.owner && cafe.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to update this cafe');
    }

    // Delete the cafe
    await this.cafeRepository.delete(id);
  }

  async getCafesByManager(managerId: number): Promise<Cafe[]> {
    return this.cafeRepository.find({ where: { ownerId: managerId } });
  }

  async isManagerManagingCafe(managerId: number): Promise<boolean> {
    const cafe = await this.cafeRepository.findOne({
      where: { managerId: managerId },
    });
    return !!cafe; // Returns true if a cafe is found, false otherwise
  }
}
