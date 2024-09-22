import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/entities/user.entity';
import { Cafe } from 'src/cafes/entities/cafe.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(Cafe)
    private cafeRepository: Repository<Cafe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createMenuDto: CreateMenuDto,
    userId: number,
    userRole: string,
  ): Promise<Menu> {
    const cafe = await this.cafeRepository.findOne({
      where: { id: createMenuDto.cafeId },
      relations: ['manager'],
    });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (userRole === UserRole.manager && cafe.managerId !== userId) {
      throw new ForbiddenException('You do not manage this cafe');
    }

    const menu = this.menuRepository.create({
      ...createMenuDto,
      cafeId: cafe.id,
    });

    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  async update(
    id: number,
    updateMenuDto: UpdateMenuDto,
    userId: number,
    userRole: string,
  ): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['cafe'],
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const cafe = await this.cafeRepository.findOne({
      where: { id: menu.cafeId },
      relations: ['manager'],
    });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (userRole === UserRole.manager && cafe.managerId !== userId) {
      throw new ForbiddenException('You do not manage this cafe');
    }

    // Update the menu
    await this.menuRepository.update(id, updateMenuDto);

    // Return the updated menu
    return this.findOne(id);
  }

  async remove(id: number, userId: number, userRole: string): Promise<void> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['cafe'],
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const cafe = await this.cafeRepository.findOne({
      where: { id: menu.cafeId },
      relations: ['manager'],
    });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    if (userRole === UserRole.manager && cafe.managerId !== userId) {
      throw new ForbiddenException('You do not manage this cafe');
    }

    // Proceed to delete the menu
    await this.menuRepository.delete(id);
  }

  async isUserManager(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user && user.role === UserRole.manager;
  }

  async findRecommendedMenus(): Promise<Menu[]> {
    return this.menuRepository.find({
      where: { isRecommendation: true },
    });
  }

  async findMenusByCafe(cafeId: number): Promise<Menu[]> {
    const cafe = await this.cafeRepository.findOne({ where: { id: cafeId } });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    return this.menuRepository.find({ where: { cafeId } });
  }
}
