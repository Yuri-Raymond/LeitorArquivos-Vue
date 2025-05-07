import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './Class.schema'; // Substitua com o seu esquema real

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private readonly ClassModel: Model<Class>) {}

  async create(data: Partial<Class>): Promise<Class> {
    const newClass = new this.ClassModel(data);
    return await newClass.save();
  }

  async findAll(): Promise<Class[]> {
    return await this.ClassModel.find().exec();
  }

  async findById(id: string): Promise<Class> {
    const Class = await this.ClassModel.findById(id).exec();
    if (!Class) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return Class;
  }

  async update(id: string, data: Partial<Class>): Promise<Class> {
    const updatedClass = await this.ClassModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedClass) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedClass;
  }

  async delete(id: string): Promise<Class> {
    const deletedClass = await this.ClassModel.findByIdAndDelete(id).exec();
    if (!deletedClass) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedClass;
  }
}
