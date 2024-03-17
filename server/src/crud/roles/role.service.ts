import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/createRole.dto';
import { Role } from './role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private model: Model<Role>) {}

  // Получение всех ролей
  async getRoles() {
    return await this.model.find();
  }

  // Создание новой роли
  async createRole(dto: CreateRoleDto) {
    return await this.model.create(dto);
  }

  // Получение роли по значению
  async getRoleByValue(value: string) {
    return await this.model.findOne({ value: value });
  }

  // Получение роли или создание
  async getRoleByValueOrCreate(role: string) {
    return await this.model.findOneAndUpdate(
      { value: role },
      { value: role },
      { upsert: true, new: true },
    );
  }
}
