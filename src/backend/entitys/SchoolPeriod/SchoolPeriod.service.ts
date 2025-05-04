import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolPeriod } from './SchoolPeriod.schema'; // Substitua com o seu esquema real

@Injectable()
export class SchoolPeriodService {
  constructor(@InjectModel(SchoolPeriod.name) private readonly SchoolPeriodModel: Model<SchoolPeriod>) {}

  async create(data: Partial<SchoolPeriod>): Promise<SchoolPeriod> {
    const newSchoolPeriod = new this.SchoolPeriodModel(data);
    return await newSchoolPeriod.save();
  }

  async findAll(): Promise<SchoolPeriod[]> {
    return await this.SchoolPeriodModel.find().exec();
  }

  async findById(id: string): Promise<SchoolPeriod> {
    const SchoolPeriod = await this.SchoolPeriodModel.findById(id).exec();
    if (!SchoolPeriod) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return SchoolPeriod;
  }

  async update(id: string, data: Partial<SchoolPeriod>): Promise<SchoolPeriod> {
    const updatedSchoolPeriod = await this.SchoolPeriodModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedSchoolPeriod) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedSchoolPeriod;
  }

  async delete(id: string): Promise<SchoolPeriod> {
    const deletedSchoolPeriod = await this.SchoolPeriodModel.findByIdAndDelete(id).exec();
    if (!deletedSchoolPeriod) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedSchoolPeriod;
  }
}
