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
    return await this.BondModel.find().exec();
  }

  async findById(id: string): Promise<Bond> {
    const Bond = await this.BondModel.findById(id).exec();
    if (!Bond) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return Bond;
  }

  async update(id: string, data: Partial<Bond>): Promise<Bond> {
    const updatedBond = await this.BondModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedBond) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedBond;
  }

  async delete(id: string): Promise<Bond> {
    const deletedBond = await this.BondModel.findByIdAndDelete(id).exec();
    if (!deletedBond) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedBond;
  }
}
