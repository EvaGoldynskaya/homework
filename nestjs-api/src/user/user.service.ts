import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

export interface User{
  id: string
  name: string
  birthdate: string
  email: string
}

@Injectable()
export class UserService {

  private users: User[] = []
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../../mock-data/user.data.json');
    console.log('filePath', this.filePath)
    this.load()
  }

  private load(): void {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      console.log('File not found');
      this.users = [];
    }
  }

  private save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
  }

  findAll(name:string = '') {
    return this.users.filter(user =>
    user.name.toLowerCase().includes(name.toLowerCase()))
  }

  findById(id:string) {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  create(dto:CreateUserDto){
    const newUser:User = { id: globalThis.crypto.randomUUID(), ...dto }
    this.users.push(newUser)
    this.save()
    return newUser
  }

  update(id:string, dto:UpdateUserDto){
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;

    this.users[index] = { ...this.users[index], ...dto };
    this.save()
    return this.users[index]
  }

  delete(id:string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    const [deleted] = this.users.splice(index, 1)
    this.save()
    return deleted
  }
}
