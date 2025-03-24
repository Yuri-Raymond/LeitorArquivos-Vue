import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';
import { Express } from 'express';

@Controller('api/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepta o upload de arquivos
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      // Salvar ou processar o arquivo aqui
      const fileName = file.originalname;
      const fileSize = file.size;

      await this.fileService.save(file);

      // Exemplo: apenas exibir informações do arquivo
      return `Arquivo recebido: ${fileName} (${fileSize} bytes)`;
    } catch (error) {
      throw new HttpException(
        `Erro ao processar o arquivo: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
