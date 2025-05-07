import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicClass } from './AcademicClass.schema'; // Substitua com o seu esquema real
import { AcademicClassDto } from './AcademicClass.Dto';

@Injectable()
export class AcademicClassService {
  constructor(@InjectModel(AcademicClass.name) private readonly AcademicClassModel: Model<AcademicClass>) {}

  async create(data: AcademicClassDto): Promise<AcademicClass> {
    const newAcademicClass = new this.AcademicClassModel(data);
    return await newAcademicClass.save();
  }

  async findAll(): Promise<AcademicClass[]> {
    return await this.AcademicClassModel.find().exec();
  }

  async findById(id: string): Promise<AcademicClass> {
    const AcademicClass = await this.AcademicClassModel.findById(id).exec();
    if (!AcademicClass) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return AcademicClass;
  }

  async update(id: string, data: Partial<AcademicClass>): Promise<AcademicClass> {
    const updatedAcademicClass = await this.AcademicClassModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedAcademicClass) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedAcademicClass;
  }

  async delete(id: string): Promise<AcademicClass> {
    const deletedAcademicClass = await this.AcademicClassModel.findByIdAndDelete(id).exec();
    if (!deletedAcademicClass) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedAcademicClass;
  }
}
