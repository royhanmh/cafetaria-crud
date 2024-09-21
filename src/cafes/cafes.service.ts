import {
  Injectable,
  NotFoundException,
  ForbiddenException,
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
    // Check if the owner exists and has the 'owner' role
    const owner = await this.userRepository.findOne({
      where: { id: createCafeDto.ownerId },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    if (owner.role !== UserRole.owner) {
      throw new ForbiddenException('User is not an owner');
    }

    // Proceed to create the cafe
    const cafe = this.cafeRepository.create(createCafeDto);
    return this.cafeRepository.save(cafe);
  }

  async getCafes(): Promise<Cafe[]> {
    return this.cafeRepository.find();
  }

  async getCafeById(id: number): Promise<Cafe> {
    return this.cafeRepository.findOne({ where: { id } });
  }

  async updateCafe(id: number, updateCafeDto: UpdateCafeDto): Promise<Cafe> {
    const cafe = await this.cafeRepository.findOne({ where: { id } });
    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (updateCafeDto.ownerId) {
      const owner = await this.userRepository.findOne({
        where: { id: updateCafeDto.ownerId },
      });
      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
      if (owner.role !== UserRole.owner) {
        throw new ForbiddenException('User is not an owner');
      }
    }

    await this.cafeRepository.update(id, updateCafeDto);

    return this.getCafeById(id);
  }

  async deleteCafe(id: number): Promise<void> {
    await this.cafeRepository.delete(id);
  }
}
