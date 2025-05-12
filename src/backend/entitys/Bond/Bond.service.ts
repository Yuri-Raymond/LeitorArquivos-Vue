import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bond } from './Bond.schema'; // Substitua com o seu esquema real
import { BondDto } from './Bond.Dto';

@Injectable()
export class BondService {
  constructor(@InjectModel(Bond.name) private readonly BondModel: Model<Bond>) {}

  async create(data: BondDto): Promise<Bond> {
    const newBond = new this.BondModel(data);
    return await newBond.save();
  }

  async findAll(): Promise<Bond[]> {
  return this.BondModel.find().exec();
  }

  async findById(id: string): Promise<Bond> {
    const bond = await this.BondModel.findById(id).exec();
    if (!bond) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return bond;
  }

  async update(id: string, data: BondDto): Promise<Bond> {
  const existingBond = await this.BondModel.findById(id).exec();
  if (!existingBond) {
    throw new NotFoundException(`Registro com ID ${id} não encontrado`);
  }

  Object.assign(existingBond, data); // Atualiza os campos do documento com os novos valores
  return await existingBond.save(); // Persiste as alterações, validando os campos automaticamente
}


  async delete(id: string): Promise<Bond> {
    const deletedBond = await this.BondModel.findByIdAndDelete(id).exec();
    if (!deletedBond) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado`);
    }
    return deletedBond;
  }

}
