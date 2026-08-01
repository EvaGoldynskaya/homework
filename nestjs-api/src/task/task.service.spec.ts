import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import fs from 'fs';
import mockTasksData from '../../mock-data/task.data.json';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('TaskService', () => {
  let service: TaskService;
  const testTask = mockTasksData[0]

  beforeEach(async () => {
    jest.clearAllMocks();
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockTasksData));
    mockFs.writeFileSync.mockImplementation(() => {});
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {

    it('Все задачи', () => {
      const result = service.findAll('', '');
      expect(result).toHaveLength(mockTasksData.length);
      expect(result).toEqual(mockTasksData);
    });

    it('Задачи по названию', () => {
      const result = service.findAll(testTask.name,'');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(task => task.name.includes(testTask.name))).toBe(true);
    });

    it('Задачи по пользователю', () => {
      const result = service.findAll('',testTask.userId);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(task => task.userId === testTask.userId)).toBe(true);
    });

    it('Задачи по названию и пользователю', () => {
      const result = service.findAll(testTask.name, testTask.userId);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(testTask);
    });

    it('Пустой список (нет совпадений)', () => {
      const result = service.findAll('NonExistentTask', '');
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('Задача по id', () => {
      const result = service.findById(testTask.id);
      expect(result).toEqual(testTask);
    });

    it('Задача не найдена - NotFoundException', () => {
      expect(() => service.findById('non-existent-id')).toThrow(NotFoundException);
      expect(() => service.findById('non-existent-id')).toThrow('Task not found');
    });
  });

  describe('create', () => {
    it('Создание задачи', () => {
      const createDto: CreateTaskDto = {
        name: 'New Task',
        userId: testTask.userId,
        description: 'New Description',
        deadline: '2026-09-01',
        status: 'INPROG',
      };

      const mockUUID = 't2a4f3b9-1d2e-4f8a-9b3c-1e1h5a4b5c6d';
      jest.spyOn(global.crypto, 'randomUUID').mockReturnValue(mockUUID);
      const result = service.create(createDto);

      expect(result).toEqual({
        id: mockUUID,
        ...createDto,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('Обновление задачи', () => {
      const updateDto: UpdateTaskDto = {
        name: 'Updated Task Name',
        userId: testTask.userId,
        description: 'Updated Description',
        deadline: '2026-07-25',
        status: 'DONE',
      };

      const result = service.update(testTask.id, updateDto);

      expect(result).toEqual({
        ...testTask,
        ...updateDto,
      });

      const updatedTask = service.findById(testTask.id);
      expect(updatedTask.name).toBe('Updated Task Name');
      expect(updatedTask.description).toBe('Updated Description');
      expect(updatedTask.status).toBe('DONE');

      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('Удаление задачи', () => {
      const result = service.delete(testTask.id);
      expect(result).toEqual(testTask);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

});
