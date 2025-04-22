import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Readable } from 'stream';
const csvParser = require('csv-parser');
import { Model } from 'mongoose';
import { AcademicClass } from '../schemas/folder.schema';
import { Discipline } from '../schemas/folder.schema';
import { DisciplineUser } from '../schemas/folder.schema';
import { SchoolPeriod } from '../schemas/folder.schema';
import { User } from '../schemas/folder.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(AcademicClass.name) private academicClassModel: Model<AcademicClass>,
    @InjectModel(Discipline.name) private disciplineModel: Model<Discipline>,
    @InjectModel(DisciplineUser.name) private disciplineUserModel: Model<DisciplineUser>,
    @InjectModel(SchoolPeriod.name) private schoolPeriodModel: Model<SchoolPeriod>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async save(file: Express.Multer.File, schemaName: string): Promise<void> {
    try {
      console.log('Arquivo recebido:', file);

      // Lê o buffer do arquivo diretamente como um stream
      const fileStream = Readable.from(file.buffer);

      // Processar os dados e enviá-los ao MongoDB
      await this.processFile(fileStream, schemaName);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao salvar o arquivo:', error.message, error.stack);
      } else {
        console.error('Erro desconhecido ao salvar o arquivo:', error);
      }
      throw new Error('Erro ao salvar o arquivo.');
    }
  }

  private async processFile(fileStream: Readable, schemaName: string): Promise<void> {
    try {
      const records: Record<string, any>[] = [];
      const modelMap: Record<string, Model<any>> = {
        AcademicClass: this.academicClassModel,
        Discipline: this.disciplineModel,
        DisciplineUser: this.disciplineUserModel,
        SchoolPeriod: this.schoolPeriodModel,
        User: this.userModel,
      };

      const model = modelMap[schemaName];
      if (!model) {
        throw new Error(`Schema ${schemaName} não encontrado.`);
      }

      // Processar o arquivo CSV
      await new Promise<void>((resolve, reject) => {
        fileStream
          .pipe(csvParser())
          .on('data', (row: Record<string, any>) => {
            records.push(row);
          })
          .on('end', async () => {
            console.log(`Arquivo processado, inserindo no MongoDB com o schema ${schemaName}...`);

            // Inserir os dados no MongoDB usando o schema selecionado
            for (const record of records) {
              await model.create(record);
            }

            console.log('Dados inseridos com sucesso no MongoDB.');
            resolve();
          })
          .on('error', (error: Error) => {
            console.error('Erro ao processar o arquivo:', error);
            reject(error);
          });
      });
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      throw new Error('Erro ao processar o arquivo.');
    }
  }
}
