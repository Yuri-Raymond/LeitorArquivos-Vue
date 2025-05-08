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
    return await this.ProcessModel.find().exec();
  }

  async findById(id: string): Promise<Process> {
    const Process = await this.ProcessModel.findById(id).exec();
    if (!Process) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return Process;
  }

  async update(id: string, data: Partial<Process>): Promise<Process> {
    const updatedProcess = await this.ProcessModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedProcess) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedProcess;
  }

  async delete(id: string): Promise<Process> {
    const deletedProcess = await this.ProcessModel.findByIdAndDelete(id).exec();
    if (!deletedProcess) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedProcess;
  }
}
