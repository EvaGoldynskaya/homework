import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getUsers(
    @Query('name') name?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.service.findAll(name, page, limit);
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
