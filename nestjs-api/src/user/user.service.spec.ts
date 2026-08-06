import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import mockUsersData from '../../mock-data/user.data.json';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('UserService', () => {
  let service: UserService;
  const testUser = mockUsersData[0];
  let userStore: typeof mockUsersData;

  const prismaMock = {
    user: {
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
    userStore = structuredClone(mockUsersData);

    prismaMock.user.findMany.mockImplementation(async ({ where, skip, take } = {}) => {
      const nameFilter = where?.name?.contains?.toLowerCase?.() ?? '';
      const filtered = userStore.filter((user) => {
        return !nameFilter || user.name.toLowerCase().includes(nameFilter);
      });

      return filtered.slice(skip ?? 0, take ? (skip ?? 0) + take : undefined);
    });
    prismaMock.user.count.mockImplementation(async ({ where } = {}) => {
      const nameFilter = where?.name?.contains?.toLowerCase?.() ?? '';

      return userStore.filter((user) => {
        return !nameFilter || user.name.toLowerCase().includes(nameFilter);
      }).length;
    });
    prismaMock.user.findUnique.mockImplementation(async ({ where: { id } }: { where: { id: string } }) => {
      return userStore.find((user) => user.id === id) ?? null;
    });
    prismaMock.user.create.mockImplementation(async ({ data }) => {
      const createdUser = {
        id: 'created-user-id',
        ...data,
      };
      userStore.push(createdUser);
      return createdUser;
    });
    prismaMock.user.update.mockImplementation(async ({ where: { id }, data }) => {
      const index = userStore.findIndex((user) => user.id === id);
      if (index === -1) {
        throw { code: 'P2025' };
      }

      userStore[index] = { ...userStore[index], ...data };
      return userStore[index];
    });
    prismaMock.user.delete.mockImplementation(async ({ where: { id } }) => {
      const index = userStore.findIndex((user) => user.id === id);
      if (index === -1) {
        throw { code: 'P2025' };
      }

      const [deletedUser] = userStore.splice(index, 1);
      return deletedUser;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
  describe('findAll', () => {
    it('Все пользователи', async () => {
      const result = await service.findAll();

      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result).toHaveLength(mockUsersData.length);
        expect(result).toEqual(mockUsersData);
      }
    });

    it('Пользователи по имени', async () => {
      const result = await service.findAll(testUser.name);

      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((user) => user.name.includes(testUser.name))).toBe(true);
      }
    });

    it('Пользователи по имени (не существующий)', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);
      const result = await service.findAll('NonExistentUser');

      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
      }
    });

    it('Возвращает пагинированный список и метаданные', async () => {
      const result = await service.findAll(undefined, 2, 10);

      expect(result).toEqual({
        data: mockUsersData.slice(10, 20),
        meta: {
          total: mockUsersData.length,
          page: 2,
          limit: 10,
          totalPages: Math.ceil(mockUsersData.length / 10),
          hasNextPage: false,
          hasPreviousPage: true,
        },
      });
    });
  });

  describe('findById', () => {
    it('Пользователь по id', async () => {
      const result = await service.findById(testUser.id);

      expect(result).toEqual(testUser);
    });

    it('NotFoundException когда пользователь не найден', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(service.findById('non-existent-id')).rejects.toThrow(NotFoundException);
      await expect(service.findById('non-existent-id')).rejects.toThrow('User not found');
    });
  });

  describe('create', () => {
    it('Создание пользователя', async () => {
      const createDto: CreateUserDto = {
        name: 'New User',
        birthdate: '2026-09-01',
        email: 'newuser@example.com',
      };

      const result = await service.create(createDto);

      expect(result).toEqual({
        id: 'created-user-id',
        ...createDto,
      });
      expect(prismaMock.user.create).toHaveBeenCalledWith({ data: createDto });
    });
  });

  describe('update', () => {
    it('Обновление пользователя', async () => {
      const updateDto: UpdateUserDto = {
        name: 'Updated User',
        birthdate: '2026-07-25',
        email: 'updated@example.com',
      };

      const result = await service.update(testUser.id, updateDto);

      expect(result).toEqual({
        ...testUser,
        ...updateDto,
      });

      const updatedUser = await service.findById(testUser.id);
      expect(updatedUser.name).toBe('Updated User');
      expect(updatedUser.email).toBe('updated@example.com');
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: testUser.id },
        data: updateDto,
      });
    });
  });

  describe('delete', () => {
    it('Удаление пользователя', async () => {
      const result = await service.delete(testUser.id);

      expect(result).toEqual(testUser);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: testUser.id } });
    });
  });
});
