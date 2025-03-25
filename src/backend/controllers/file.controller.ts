import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';
import { Express } from 'express';

@Controller('api/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Aplica o interceptor para o upload
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      const fileName = file.originalname;
      const fileSize = file.size;

      await this.fileService.save(file);

      return `Arquivo recebido: ${fileName} (${fileSize} bytes)`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          `Erro ao processar o arquivo: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Erro desconhecido ao processar o arquivo.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
