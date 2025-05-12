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
  return this.ClassModel.find().exec();
  }

  async findById(id: string): Promise<Class> {
    const Class = await this.ClassModel.findById(id).exec();
    if (!Class) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return Class;
  }

  async update(id: string, data: ClassDto): Promise<Class> {
  const existingClass = await this.ClassModel.findById(id).exec();
  if (!existingClass) {
    throw new NotFoundException(`Registro com ID ${id} não encontrado`);
  }

  Object.assign(existingClass, data); // Atualiza os campos do documento com os novos valores
  return await existingClass.save(); // Persiste as alterações, validando os campos automaticamente
}


  async delete(id: string): Promise<Class> {
    const deletedClass = await this.ClassModel.findByIdAndDelete(id).exec();
    if (!deletedClass) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return deletedClass;
  }

}
