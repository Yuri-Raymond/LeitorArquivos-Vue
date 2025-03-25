import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

@Injectable()
export class FileService {
  save(file: Express.Multer.File): void {
    try {
      console.log('Arquivo recebido:', file);

      // Caminho correto para a pasta 'uploads' na raiz do projeto
      const uploadDir = resolve('uploads'); // Caminho absoluto para a pasta 'uploads' na raiz

      // Verifica se a pasta 'uploads' existe, caso contrário, cria
      if (!existsSync(uploadDir)) {
        console.log("Caminho não encontrado");
        mkdirSync(uploadDir, { recursive: true }); // Cria a pasta e suas subpastas, se necessário
        console.log(`Pasta 'uploads' criada em: ${uploadDir}`);
      } else {
        console.log("Caminho encontrado", uploadDir);
      }

      // Caminho completo do arquivo
      const uploadPath = join(uploadDir, file.originalname);

      // Salvar o arquivo no caminho especificado
      writeFileSync(uploadPath, file.buffer);

      console.log(`Arquivo salvo em: ${uploadPath}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao salvar o arquivo 1:', error.message, error.stack);
      } else {
        console.error('Erro ao salvar o arquivo 2:', error);
      }
      throw new Error('Erro ao salvar o arquivo 3');
    }
  }
}
