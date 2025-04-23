import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export function GenericService(
  modelMap: Record<string, Model<any>>
): any {
  @Injectable()
  class GenericService {
    private readonly modelMap = modelMap;

    private getModel(schemaKey: string): Model<any> {
      const model = this.modelMap[schemaKey];
      if (!model) {
        throw new NotFoundException(`Model not found for schema: ${schemaKey}`);
      }
      return model;
    }

    async create(schemaKey: string, data: Partial<any>): Promise<any> {
      const model = this.getModel(schemaKey);
      const newItem = new model(data);
      return newItem.save();
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

  return GenericService;
}
