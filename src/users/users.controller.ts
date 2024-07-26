import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthAdmin } from 'src/auth/auth.guard.admin';
import { AuthBasic } from 'src/auth/auth.guard.basic';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthAdmin)
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @UseGuards(AuthBasic)
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateUserDto, @Res() res: Response) {
    return this.usersService.update(id, updateData);
  }

  @UseGuards(AuthAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
