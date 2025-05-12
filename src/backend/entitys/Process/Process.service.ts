import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Process } from './Process.schema'; // Substitua com o seu esquema real
import { ProcessDto } from './Process.Dto';

@Injectable()
export class ProcessService {
  constructor(@InjectModel(Process.name) private readonly ProcessModel: Model<Process>) {}

  async create(data: ProcessDto): Promise<Process> {
    const newProcess = new this.ProcessModel(data);
    return await newProcess.save();
  }

  async findAll(): Promise<Process[]> {
    return this.ProcessModel.find().exec();
  }

  async findById(matricula: string): Promise<Process> {
    const Process = await this.ProcessModel.findById(matricula).exec();
    if (!Process) {
      throw new NotFoundException(`Registro com ID ${matricula} não encontrado`);
    }
    return Process;
  }

  async update(matricula: string, data: ProcessDto): Promise<Process> {
  const existingProcess = await this.ProcessModel.findById(matricula).exec();
  if (!existingProcess) {
    throw new NotFoundException('Registro com ID ${matricula} não encontrado');
  }

  Object.assign(existingProcess, data); // Atualiza os campos do documento com os novos valores
  return await existingProcess.save(); // Persiste as alterações, validando os campos automaticamente
}


  async delete(matricula: string): Promise<Process> {
    const deletedProcess = await this.ProcessModel.findByIdAndDelete(matricula).exec();
    if (!deletedProcess) {
      throw new NotFoundException('Registro com ID ${matricula} não encontrado');
    }
    return deletedProcess;
  }

}
