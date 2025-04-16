import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder, FolderDocument } from '../schemas/folder.schema';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
  ) {}

  // Cria uma nova pasta
  async createFolder(folderName: string): Promise<Folder> {
    const existingFolder = await this.folderModel.findOne({ name: folderName });
    if (existingFolder) {
      throw new HttpException(
        `A pasta "${folderName}" já existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFolder = new this.folderModel({ name: folderName, files: [] });
    return await newFolder.save();
  }

  // Lista os conteúdos de uma pasta
  async listFolderContents(folderName: string): Promise<string[]> {
    const folder = await this.folderModel.findOne({ name: folderName });
    if (!folder) {
      throw new HttpException(
        `A pasta "${folderName}" não existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return folder.files;
  }

  // Renomeia uma pasta
  async renameFolder(oldName: string, newName: string): Promise<Folder> {
    const folder = await this.folderModel.findOne({ name: oldName });
    if (!folder) {
      throw new HttpException(
        `A pasta "${oldName}" não existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingFolder = await this.folderModel.findOne({ name: newName });
    if (existingFolder) {
      throw new HttpException(
        `A pasta "${newName}" já existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    folder.name = newName;
    return await folder.save();
  }

  // Exclui uma pasta
  async deleteFolder(folderName: string): Promise<void> {
    const folder = await this.folderModel.findOneAndDelete({ name: folderName });
    if (!folder) {
      throw new HttpException(
        `A pasta "${folderName}" não existe.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Salva um arquivo em uma pasta específica
  async saveFile(folderName: string, file: Express.Multer.File): Promise<void> {
    const folder = await this.folderModel.findOne({ name: folderName });
    if (!folder) {
      throw new HttpException(
        `A pasta "${folderName}" não existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingFile = folder.files.find((f) => f === file.originalname);
    if (existingFile) {
      throw new HttpException(
        `O arquivo "${file.originalname}" já existe na pasta.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    folder.files.push(file.originalname);
    await folder.save();
  }
}
