import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Get,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from '../services/folder.service';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('folders')
@Controller('api/folders')
export class FileController {
  constructor(private readonly folderService: FolderService) {}

  @Post('create')
  async createFolder(@Body('folderName') folderName: string): Promise<string> {
    try {
      await this.folderService.createFolder(folderName);
      return `Pasta "${folderName}" criada com sucesso.`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao criar a pasta: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao criar a pasta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':folderName')
  async listFolderContents(@Param('folderName') folderName: string): Promise<string[]> {
    try {
      return await this.folderService.listFolderContents(folderName);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao listar conteúdos da pasta: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao listar os conteúdos da pasta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post(':folderName/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('folderName') folderName: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    try {
      await this.folderService.saveFile(folderName, file);
      return `Arquivo "${file.originalname}" salvo com sucesso na pasta "${folderName}".`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao salvar o arquivo: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao salvar o arquivo.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put('rename')
  async renameFolder(@Body('oldName') oldName: string, @Body('newName') newName: string): Promise<string> {
    try {
      await this.folderService.renameFolder(oldName, newName);
      return `Pasta renomeada de "${oldName}" para "${newName}".`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao renomear a pasta: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao renomear a pasta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':folderName')
  async deleteFolder(@Param('folderName') folderName: string): Promise<string> {
    try {
      await this.folderService.deleteFolder(folderName);
      return `Pasta "${folderName}" excluída com sucesso.`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao excluir a pasta: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao excluir a pasta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
