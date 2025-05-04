import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DisciplineUser } from './DisciplineUser.schema'; // Substitua com o seu esquema real

@Injectable()
export class DisciplineUserService {
  constructor(@InjectModel(DisciplineUser.name) private readonly DisciplineUserModel: Model<DisciplineUser>) {}

  async create(data: Partial<DisciplineUser>): Promise<DisciplineUser> {
    const newDisciplineUser = new this.DisciplineUserModel(data);
    return await newDisciplineUser.save();
  }

  async findAll(): Promise<DisciplineUser[]> {
    return await this.DisciplineUserModel.find().exec();
  }

  async findById(id: string): Promise<DisciplineUser> {
    const DisciplineUser = await this.DisciplineUserModel.findById(id).exec();
    if (!DisciplineUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return DisciplineUser;
  }

  async update(id: string, data: Partial<DisciplineUser>): Promise<DisciplineUser> {
    const updatedDisciplineUser = await this.DisciplineUserModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedDisciplineUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedDisciplineUser;
  }

  async delete(id: string): Promise<DisciplineUser> {
    const deletedDisciplineUser = await this.DisciplineUserModel.findByIdAndDelete(id).exec();
    if (!deletedDisciplineUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedDisciplineUser;
  }
}
