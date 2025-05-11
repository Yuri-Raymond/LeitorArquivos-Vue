import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './Class.schema'; // Substitua com o seu esquema real
import { ClassDto } from './Class.Dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private readonly ClassModel: Model<Class>) {}

  async create(data: ClassDto): Promise<Class> {
    const newClass = new this.ClassModel(data);
    return await newClass.save();
  }

  async findAll(): Promise<Class[]> {
    return await this.ClassModel.find().exec();
  }

  async findById(codigo: string): Promise<Class> {
    const Class = await this.ClassModel.findById(codigo).exec();
    if (!Class) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return Class;
  }

  async update(codigo: string, data: Partial<Class>): Promise<Class> {
    const updatedClass = await this.ClassModel
      .findByIdAndUpdate(codigo, data, { new: true })
      .exec();
    if (!updatedClass) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return updatedClass;
  }
  
  async updateBulk(users: Partial<Class>[]): Promise<any> {
    const operations = users.map(cls => {
      if (!cls.codigo) return null;

      return {
        updateOne: {
          filter: { codigo: cls.codigo },
          update: { $set: cls },
          upsert: true
        }
      };
    }).filter(op => op !== null);

    return this.ClassModel.bulkWrite(operations);
  }

  async delete(codigo: string): Promise<Class> {
    const deletedClass = await this.ClassModel.findByIdAndDelete(codigo).exec();
    if (!deletedClass) {
      throw new NotFoundException(`Usuário com ID ${codigo} não encontrado`);
    }
    return deletedClass;
  }
}
