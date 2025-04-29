import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SchoolPeriodService {
  private readonly modelMap: Record<string, Model<any>>;

  constructor(modelMap: Record<string, Model<any>>) {
    this.modelMap = modelMap;
  }

  private validateSchemaKey(schemaKey: string): void {
    if (!this.modelMap[schemaKey]) {
      throw new BadRequestException(
        `SchemaKey "${schemaKey}" não é válido. Coleções disponíveis: ${Object.keys(
          this.modelMap
        ).join(', ')}`
      );
    }
  }

  private getModel(schemaKey: string): Model<any> {
    this.validateSchemaKey(schemaKey);
    return this.modelMap[schemaKey];
  }

  async create(schemaKey: string, data: Record<string, any>): Promise<any> {
    const model = this.getModel(schemaKey);
    const newItem = new model(data);
    return await newItem.save();
  }

  async findAll(schemaKey: string): Promise<any[]> {
    const model = this.getModel(schemaKey);
    return await model.find().exec();
  }

  async findById(schemaKey: string, id: string): Promise<any> {
    const model = this.getModel(schemaKey);
    const item = await model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(
        `Item não encontrado no schema "${schemaKey}" com o ID "${id}"`
      );
    }
    return item;
  }

  async update(
    schemaKey: string,
    id: string,
    data: Record<string, any>
  ): Promise<any> {
    const model = this.getModel(schemaKey);
    const updatedItem = await model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(
        `Item não encontrado no schema "${schemaKey}" com o ID "${id}"`
      );
    }
    return updatedItem;
  }

  async delete(schemaKey: string, id: string): Promise<any> {
    const model = this.getModel(schemaKey);
    const deletedItem = await model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(
        `Item não encontrado no schema "${schemaKey}" com o ID "${id}"`
      );
    }
    return deletedItem;
  }
}
