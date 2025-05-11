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

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.UserService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>
  ): Promise<User> {
    return this.UserService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.UserService.delete(id);
  }
}
