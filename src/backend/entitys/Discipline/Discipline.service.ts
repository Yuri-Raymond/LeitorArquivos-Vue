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

  async findById(codigo: string): Promise<Discipline> {
    const Discipline = await this.DisciplineModel.findById(codigo).exec();
    if (!Discipline) {
      throw new NotFoundException(`Registro com ID ${codigo} não encontrado`);
    }
    return Discipline;
  }

  async findByCodigo(codigo: string): Promise<Discipline> {
  const Discipline = await this.DisciplineModel.findOne({ codigo }).exec();
  if (!Discipline) {
    throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
  }
  return Discipline;
}


  async update(codigo: string, data: DisciplineDto): Promise<Discipline> {
    // Busca o usuário pelo atributo 'codigo'
    const existingDiscipline = await this.DisciplineModel.findOne({ codigo }).exec();
    
    if (!existingDiscipline) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Atualiza os campos do documento com os novos valores
    Object.assign(existingDiscipline, data);

    // Salva as alterações e retorna o documento atualizado
    return await existingDiscipline.save();
  }



  async delete(codigo: string): Promise<Discipline> {
    // Busca e remove o usuário pelo atributo 'codigo'
    const deletedDiscipline = await this.DisciplineModel.findOneAndDelete({ codigo }).exec();
    
    if (!deletedDiscipline) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Retorna o documento excluído
    return deletedDiscipline;
  }


}
