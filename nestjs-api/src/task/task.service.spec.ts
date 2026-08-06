import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import mockTasksData from '../../mock-data/task.data.json';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from '../prisma.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('TaskService', () => {
  let service: TaskService;
  const testTask = mockTasksData[0];
  let taskStore: typeof mockTasksData;

  const prismaMock = {
    task: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    taskStore = structuredClone(mockTasksData);

    prismaMock.task.findMany.mockImplementation(async ({ where = {}, skip, take } = {}) => {
      const nameFilter = where.name?.contains?.toLowerCase?.() ?? '';
      const userIdFilter = where.userId ?? '';

      const filtered = taskStore.filter((task) => {
        const matchesName = !nameFilter || task.name.toLowerCase().includes(nameFilter);
        const matchesUserId = !userIdFilter || task.userId === userIdFilter;
        return matchesName && matchesUserId;
      });

      return filtered.slice(skip ?? 0, take ? (skip ?? 0) + take : undefined);
    });
    prismaMock.task.count.mockImplementation(async ({ where = {} } = {}) => {
      const nameFilter = where.name?.contains?.toLowerCase?.() ?? '';
      const userIdFilter = where.userId ?? '';

      return taskStore.filter((task) => {
        const matchesName = !nameFilter || task.name.toLowerCase().includes(nameFilter);
        const matchesUserId = !userIdFilter || task.userId === userIdFilter;
        return matchesName && matchesUserId;
      }).length;
    });
    prismaMock.task.findUnique.mockImplementation(async ({ where: { id } }: { where: { id: string } }) => {
      return taskStore.find((task) => task.id === id) ?? null;
    });
    prismaMock.task.create.mockImplementation(async ({ data }) => {
      const createdTask = {
        id: 'created-task-id',
        ...data,
      };
      taskStore.push(createdTask);
      return createdTask;
    });
    prismaMock.task.update.mockImplementation(async ({ where: { id }, data }) => {
      const index = taskStore.findIndex((task) => task.id === id);
      if (index === -1) {
        throw { code: 'P2025' };
      }

      taskStore[index] = { ...taskStore[index], ...data };
      return taskStore[index];
    });
    prismaMock.task.delete.mockImplementation(async ({ where: { id } }) => {
      const index = taskStore.findIndex((task) => task.id === id);
      if (index === -1) {
        throw { code: 'P2025' };
      }

      const [deletedTask] = taskStore.splice(index, 1);
      return deletedTask;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {

    it('Все задачи', async () => {
      const result = await service.findAll('', '');
      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result).toHaveLength(mockTasksData.length);
        expect(result).toEqual(mockTasksData);
      }
    });

    it('Задачи по названию', async () => {
      const result = await service.findAll(testTask.name, '');
      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((task) => task.name.includes(testTask.name))).toBe(true);
      }
    });

    it('Задачи по пользователю', async () => {
      const result = await service.findAll('', testTask.userId);
      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((task) => task.userId === testTask.userId)).toBe(true);
      }
    });

    it('Задачи по названию и пользователю', async () => {
      const result = await service.findAll(testTask.name, testTask.userId);
      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toEqual(testTask);
      }
    });

    it('Пустой список (нет совпадений)', async () => {
      prismaMock.task.findMany.mockResolvedValue([]);
      const result = await service.findAll('NonExistentTask', '');
      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
      }
    });

    it('Возвращает пагинированный список и метаданные', async () => {
      const result = await service.findAll(undefined, undefined, 2, 10);

      expect(result).toEqual({
        data: mockTasksData.slice(10, 20),
        meta: {
          total: mockTasksData.length,
          page: 2,
          limit: 10,
          totalPages: Math.ceil(mockTasksData.length / 10),
          hasNextPage: mockTasksData.length > 20,
          hasPreviousPage: true,
        },
      });
    });
  });

  describe('findById', () => {
    it('Задача по id', async () => {
      const result = await service.findById(testTask.id);
      expect(result).toEqual(testTask);
    });

    it('Задача не найдена - NotFoundException', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null);
      await expect(service.findById('non-existent-id')).rejects.toThrow(NotFoundException);
      await expect(service.findById('non-existent-id')).rejects.toThrow('Task not found');
    });
  });

  describe('create', () => {
    it('Создание задачи', async () => {
      const createDto: CreateTaskDto = {
        name: 'New Task',
        userId: testTask.userId,
        description: 'New Description',
        deadline: '2026-09-01',
        status: 'INPROG',
      };

      const result = await service.create(createDto);

      expect(result).toEqual({
        id: 'created-task-id',
        ...createDto,
      });
      expect(prismaMock.task.create).toHaveBeenCalledWith({ data: createDto });
    });
  });

  describe('update', () => {
    it('Обновление задачи', async () => {
      const updateDto: UpdateTaskDto = {
        name: 'Updated Task Name',
        userId: testTask.userId,
        description: 'Updated Description',
        deadline: '2026-07-25',
        status: 'DONE',
      };

      const result = await service.update(testTask.id, updateDto);

      expect(result).toEqual({
        ...testTask,
        ...updateDto,
      });

      const updatedTask = await service.findById(testTask.id);
      expect(updatedTask.name).toBe('Updated Task Name');
      expect(updatedTask.description).toBe('Updated Description');
      expect(updatedTask.status).toBe('DONE');

      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: { id: testTask.id },
        data: updateDto,
      });
    });
  });

  describe('delete', () => {
    it('Удаление задачи', async () => {
      const result = await service.delete(testTask.id);
      expect(result).toEqual(testTask);
      expect(prismaMock.task.delete).toHaveBeenCalledWith({ where: { id: testTask.id } });
    });
  });

});
