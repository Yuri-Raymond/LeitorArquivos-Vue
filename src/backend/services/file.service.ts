import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class GenericService {
  private readonly modelMap: Record<string, Model<any>>;

  constructor(modelMap: Record<string, Model<any>>) {
    this.modelMap = modelMap;
  }

  private validateSchemaKey(schemaKey: string): void {
    const allowedSchemas = Object.keys(this.modelMap); // Obtém todas as chaves válidas
    if (!allowedSchemas.includes(schemaKey)) {
      throw new BadRequestException(`SchemaKey "${schemaKey}" não é permitido. Permitidos: ${allowedSchemas.join(', ')}`);
    }
  }

  private getModel(schemaKey: string): Model<any> {
    this.validateSchemaKey(schemaKey);
    const model = this.modelMap[schemaKey];
    if (!model) {
      throw new NotFoundException(`Model não encontrado para o schema: ${schemaKey}`);
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
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      } else {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  //Nova inserção - ehenon/nestjs-mongodb-api-boilerplate
  /*
  async create(createInstrumentDTO: CreateInstrumentDTO): Promise<InstrumentDocument> {
    const newInstrument = new this.InstrumentModel(createInstrumentDTO);
    newInstrument.identifier = uuidv1();
    return newInstrument.save();
  }
  */

  async findAll(schemaKey: string): Promise<any[]> {
    try {
      const model = this.getModel(schemaKey);
      return await model.find().exec();
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      } else {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  async findById(schemaKey: string, id: string): Promise<any> {
    try {
      const model = this.getModel(schemaKey);
      const item = await model.findById(id).exec();
      if (!item) {
        throw new NotFoundException(`Item não encontrado no schema "${schemaKey}" com o ID "${id}"`);
      }
      return item;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      } else {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  async delete(schemaKey: string, id: string): Promise<any> {
    try {
      const model = this.getModel(schemaKey);
      const deletedItem = await model.findByIdAndDelete(id).exec();
      if (!deletedItem) {
        throw new NotFoundException(`Item não encontrado no schema "${schemaKey}" com o ID "${id}"`);
      }
      return deletedItem;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      } else {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }
}
