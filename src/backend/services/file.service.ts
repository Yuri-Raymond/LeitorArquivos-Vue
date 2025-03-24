import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async save(file: Express.Multer.File): Promise<void> {
    const uploadPath = join(__dirname, '..', 'uploads', file.originalname);

    // Salva o arquivo na pasta 'uploads'
    await writeFile(uploadPath, file.buffer);
  }
}
