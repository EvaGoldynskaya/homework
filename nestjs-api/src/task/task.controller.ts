import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly service: TaskService) {}
  
    @Get()
    getTask(@Query('name') name:string, @Query('userId') userId:string) {
      return this.service.findAll(name, userId);
    }
  
    @Get(':id')
    getTaskById(@Param('id') id:string) {
      return this.service.findById(id)
    }
  
    @Post()
    createTask(@Body() createDto: CreateTaskDto){
      return this.service.create(createDto)
    }
  
    @Put(':id')
    updateTask(@Param('id') id:string, @Body() updateDto: UpdateTaskDto){
      return this.service.update(id, updateDto)
    }
  
    @Delete(':id')
    deleteUser(@Param('id') id:string) {
      return this.service.delete(id)
    }
}
