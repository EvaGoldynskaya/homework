import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';


export interface Task{
  id: string
  name: string;
  userId: string
  description: string;
  deadline: string;
  status: "DONE" | "INPROG"
}

@Injectable()
export class TaskService {
  private tasks: Task[] = []
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../../mock-data/task.data.json');
    console.log('filePath', this.filePath)
    this.load()
  }

  private load(): void {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.tasks = JSON.parse(data);
    } catch (error) {
      console.log('File not found');
      this.tasks = [];
    }
  }

  private save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2), 'utf-8');
  }

  findAll(name:string = '', userId:string = '') {
    const normalizedName = name.toLowerCase();

    return this.tasks.filter(task =>
      (name === '' || task.name.toLowerCase().includes(normalizedName)) &&
      (userId === '' || task.userId === userId)
    )
  }

  findById(id:string) {
    const task = this.tasks.find(task => task.id === id)
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return task
  }

  create(dto:CreateTaskDto){
    const newTask: Task = { id: globalThis.crypto.randomUUID(), ...dto }
    this.tasks.push(newTask)
    this.save()
    return newTask
  }

  update(id:string, dto:UpdateTaskDto){
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    this.tasks[index] = { ...this.tasks[index], ...dto };
    this.save()
    return this.tasks[index]
  }

  delete(id:string) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    const [deleted] = this.tasks.splice(index, 1)
    this.save()
    return deleted
  }
}
