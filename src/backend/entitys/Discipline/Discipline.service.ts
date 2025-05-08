import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real
import { DisciplineDto } from './Discipline.Dto';

@Injectable()
export class DisciplineService {
  constructor(@InjectModel(Discipline.name) private readonly DisciplineModel: Model<Discipline>) {}

  async create(data: DisciplineDto): Promise<Discipline> {
    const newDiscipline = new this.DisciplineModel(data);
    return await newDiscipline.save();
  }

  async findAll(): Promise<Discipline[]> {
    return await this.DisciplineModel.find().exec();
  }

  async findById(id: string): Promise<Discipline> {
    const Discipline = await this.DisciplineModel.findById(id).exec();
    if (!Discipline) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return Discipline;
  }

  async update(id: string, data: Partial<Discipline>): Promise<Discipline> {
    const updatedDiscipline = await this.DisciplineModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedDiscipline) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedDiscipline;
  }

  async delete(id: string): Promise<Discipline> {
    const deletedDiscipline = await this.DisciplineModel.findByIdAndDelete(id).exec();
    if (!deletedDiscipline) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedDiscipline;
  }
}
