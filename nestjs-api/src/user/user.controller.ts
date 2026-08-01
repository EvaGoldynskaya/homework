import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getUsers(@Query('name') name:string) {
    return this.service.findAll(name);
  }

  @Get(':id')
  getUserById(@Param('id') id:string) {
    return this.service.findById(id)
  }

  @Post()
  createUser(@Body() createDto: CreateUserDto){
    return this.service.create(createDto)
  }

  @Put(':id')
  updateUser(@Param('id') id:string, @Body() updateDto: UpdateUserDto){
    return this.service.update(id, updateDto)
  }

  @Delete(':id')
  deleteUser(@Param('id') id:string) {
    return this.service.delete(id)
  }
}
