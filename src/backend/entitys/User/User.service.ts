import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema'; // Substitua com o seu esquema real
import { UserDto } from './User.Dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

  async create(data: UserDto): Promise<User> {
    const newUser = new this.UserModel(data);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const User = await this.UserModel.findById(id).exec();
    if (!User) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return User;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.UserModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return deletedUser;
  }
}
