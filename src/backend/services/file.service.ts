import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class GenericService {
  private readonly modelMap: Record<string, Model<any>>;

  constructor(modelMap: Record<string, Model<any>>) {
    this.modelMap = modelMap;
  }

  private getModel(schemaKey: string): Model<any> {
    const model = this.modelMap[schemaKey];
    if (!model) {
      throw new NotFoundException(`Model not found for schema: ${schemaKey}`);
    }
    return model;
  }

  async create(schemaKey: string, data: Partial<any>): Promise<any> {
    try {
      const model = this.getModel(schemaKey);
      const newItem = new model(data);
      return await newItem.save();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao salvar no banco:', error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message || 'Erro desconhecido'}`);
      } else {
        console.error('Erro desconhecido:', error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  async findAll(schemaKey: string): Promise<any[]> {
    const model = this.getModel(schemaKey);
    return model.find().exec();
  }

  async findById(schemaKey: string, id: string): Promise<any> {
    const model = this.getModel(schemaKey);
    const item = await model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item not found in schema: ${schemaKey}`);
    }
    return item;
  }

  async delete(schemaKey: string, id: string): Promise<any> {
    const model = this.getModel(schemaKey);
    const deletedItem = await model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Item not found in schema: ${schemaKey}`);
    }
    return deletedItem;
  }
}
