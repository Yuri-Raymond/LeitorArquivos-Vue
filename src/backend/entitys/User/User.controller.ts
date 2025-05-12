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
  async findUnique(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.findByMatricula(matricula);
  }

  @Put('Put/:matricula')
  async update(
    @Param('matricula') matricula: string,
    @Body() data: UserDto
  ): Promise<User> {
    return this.UserService.update(matricula, data);
  }

  @Delete('Delete/:matricula')
  async delete(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.delete(matricula);
  }

}
