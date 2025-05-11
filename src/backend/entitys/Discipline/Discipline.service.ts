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

  async findById(codigo: string): Promise<Discipline> {
    const Discipline = await this.DisciplineModel.findById(codigo).exec();
    if (!Discipline) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return Discipline;
  }

  async update(codigo: string, data: Partial<Discipline>): Promise<Discipline> {
    const updatedDiscipline = await this.DisciplineModel
      .findByIdAndUpdate(codigo, data, { new: true })
      .exec();
    if (!updatedDiscipline) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return updatedDiscipline;
  }
  
  async updateBulk(users: Partial<Discipline>[]): Promise<any> {
    const operations = users.map(discipline => {
      if (!discipline.codigo) return null;

      return {
        updateOne: {
          filter: { codigo: discipline.codigo },
          update: { $set: discipline },
          upsert: true
        }
      };
    }).filter(op => op !== null);

    return this.DisciplineModel.bulkWrite(operations);
  }

  async delete(codigo: string): Promise<Discipline> {
    const deletedDiscipline = await this.DisciplineModel.findByIdAndDelete(codigo).exec();
    if (!deletedDiscipline) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return deletedDiscipline;
  }
}
