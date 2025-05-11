import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './User.service';
import { User } from './User.schema'; // Substitua com o seu esquema real
import { UserDto } from './User.Dto';

@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: UserDto): Promise<any> {
    return this.UserService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<User[]> {
    return this.UserService.findAll();
  }

  @Get('Get/:matricula')
  async findById(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.findById(matricula);
  }

  @Put('Put/:matricula')
  async update(
    @Param('matricula') matricula: string,
    @Body() data: Partial<User>
  ): Promise<User> {
    return this.UserService.update(matricula, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() users: Partial<User>[]): Promise<any> {
    return this.UserService.updateBulk(users);
  }

  @Delete('Delete/:matricula')
  async delete(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.delete(matricula);
  }
}
