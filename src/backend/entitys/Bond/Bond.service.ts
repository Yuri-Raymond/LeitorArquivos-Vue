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

  async findById(matricula: string): Promise<Bond> {
    const Bond = await this.BondModel.findById(matricula).exec();
    if (!Bond) {
      throw new NotFoundException(`Usuário com ID ${matricula} não encontrado`);
    }
    return Bond;
  }

  async update(matricula: string, data: Partial<Bond>): Promise<Bond> {
    const updatedBond = await this.BondModel
      .findByIdAndUpdate(matricula, data, { new: true })
      .exec();
    if (!updatedBond) {
      throw new NotFoundException(`Usuário com ID ${matricula} não encontrado`);
    }
    return updatedBond;
  }
  
  async updateBulk(data: Partial<Bond>[]): Promise<any> {
    const operations = data.map(bond => {
      if (!bond.matricula) return null;

      return {
        updateOne: {
          filter: { matricula: bond.matricula },
          update: { $set: bond },
          upsert: true
        }
      };
    }).filter(op => op !== null);

    return this.BondModel.bulkWrite(operations);
  }

  async delete(matricula: string): Promise<Bond> {
    const deletedBond = await this.BondModel.findByIdAndDelete(matricula).exec();
    if (!deletedBond) {
      throw new NotFoundException(`Usuário com ID ${matricula} não encontrado`);
    }
    return deletedBond;
  }
}
