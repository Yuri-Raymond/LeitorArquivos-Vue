import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { DisciplineUserService } from './DisciplineUser.service';
import { DisciplineUser } from './DisciplineUser.schema'; // Substitua com o seu esquema real

@Controller('DisciplineUser')
export class DisciplineUserController {
  constructor(private readonly DisciplineUserService: DisciplineUserService) {}

  @Post('Post')
  async create(@Body() data: Partial<DisciplineUser>): Promise<DisciplineUser> {
    return this.DisciplineUserService.create(data);
  }

  @Get('Get')
  async findAll(): Promise<DisciplineUser[]> {
    return this.DisciplineUserService.findAll();
  }

  @Get('Get/:id')
  async findById(@Param('id') id: string): Promise<DisciplineUser> {
    return this.DisciplineUserService.findById(id);
  }

  @Put('Put/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<DisciplineUser>
  ): Promise<DisciplineUser> {
    return this.DisciplineUserService.update(id, data);
  }

  @Delete('Delete/:id')
  async delete(@Param('id') id: string): Promise<DisciplineUser> {
    return this.DisciplineUserService.delete(id);
  }
}
