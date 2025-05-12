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
  return this.DisciplineModel.find().exec();
  }

  async findById(id: string): Promise<Discipline> {
    const Discipline = await this.DisciplineModel.findById(id).exec();
    if (!Discipline) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return Discipline;
  }

  async update(id: string, data: DisciplineDto): Promise<Discipline> {
  const existingDiscipline = await this.DisciplineModel.findById(id).exec();
  if (!existingDiscipline) {
    throw new NotFoundException(`Registro com ID ${id} não encontrado`);
  }

  Object.assign(existingDiscipline, data); // Atualiza os campos do documento com os novos valores
  return await existingDiscipline.save(); // Persiste as alterações, validando os campos automaticamente
}


  async delete(id: string): Promise<Discipline> {
    const deletedDiscipline = await this.DisciplineModel.findByIdAndDelete(id).exec();
    if (!deletedDiscipline) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return deletedDiscipline;
  }

}
