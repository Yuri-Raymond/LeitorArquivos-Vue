import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DisciplineService {
  private readonly modelMap: Record<string, Model<any>>;
  private readonly configService: ConfigService;

  constructor({
    configService,
    modelMap
  }: {
    configService: ConfigService;
    modelMap: Record<string, Model<any>>;
  }) {
    this.configService = configService;
    this.modelMap = modelMap;
  }

  getDatabaseUrl(): string {
    // Solução para o erro 1: Garantir que o retorno seja do tipo string
    return this.configService.get<string>('DATABASE_URL') ?? 'defaultDatabaseUrl';
  }

  private validateSchemaKey(schemaKey: string): void {
    const allowedSchemas = Object.keys(this.modelMap);
    if (!allowedSchemas.includes(schemaKey)) {
      throw new BadRequestException(
        `SchemaKey "${schemaKey}" não é permitido. Permitidos: ${allowedSchemas.join(', ')}`
      );
    }
  }

  private getModel<T>(schemaKey: string): Model<T> {
    this.validateSchemaKey(schemaKey);
    const model = this.modelMap[schemaKey] as Model<T>;
    if (!model) {
      throw new NotFoundException(`Model não encontrado para o schema: ${schemaKey}`);
    }
    return model;
  }

  async create<T>(schemaKey: string, data: Partial<T>): Promise<T> {
    try {
      const model = this.getModel(schemaKey);
      const newItem = new model(data);
      const savedItem = await newItem.save();
      return savedItem as T; // Cast explícito para T
    } catch (error) {
      console.error(`Erro ao criar item no schema "${schemaKey}":`, error);
      throw new Error('Erro ao salvar no banco');
    }
  }
  

  async findAll<T>(schemaKey: string): Promise<T[]> {
    try {
      const model = this.getModel<T>(schemaKey);
      return await model.find().exec();
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao criar item no schema "${schemaKey}":`, error.message);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
      } else {
        console.error(`Erro desconhecido ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  async findById<T>(schemaKey: string, id: string): Promise<T> {
    try {
      const model = this.getModel<T>(schemaKey);
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
        console.error(`Erro desconhecido ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }

  async delete<T>(schemaKey: string, id: string): Promise<T> {
    try {
      const model = this.getModel<T>(schemaKey);
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
        console.error(`Erro desconhecido ao criar item no schema "${schemaKey}":`, error);
        throw new Error('Erro desconhecido');
      }
    }
  }
}
