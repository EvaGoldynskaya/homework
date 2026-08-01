import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import fs from 'fs';
import mockUsersData from '../../mock-data/user.data.json';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('UserService', () => {
  let service: UserService;
  const testUser = mockUsersData[0];

  beforeEach(async () => {
    jest.clearAllMocks();
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockUsersData));
    mockFs.writeFileSync.mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
  describe('findAll', () => {
    it('Все пользователи', () => {
      const result = service.findAll('');

      expect(result).toHaveLength(mockUsersData.length);
      expect(result).toEqual(mockUsersData);
    });

    it('Пользователи по имени', () => {
      const result = service.findAll(testUser.name);

      expect(result.length).toBeGreaterThan(0);
      expect(result.every(user => user.name.includes(testUser.name))).toBe(true);
    });

    it('Пользователи по имени (не существующий)', () => {
      const result = service.findAll('NonExistentUser');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findById', () => {
    it('Пользователь по id', () => {
      const result = service.findById(testUser.id);

      expect(result).toEqual(testUser);
    });

    it('NotFoundException когда пользователь не найден', () => {
      expect(() => service.findById('non-existent-id')).toThrow(NotFoundException);
      expect(() => service.findById('non-existent-id')).toThrow('User not found');
    });
  });

  describe('create', () => {
    it('Создание пользователя', () => {
      const createDto: CreateUserDto = {
        name: 'New User',
        birthdate: '2026-09-01',
        email: 'newuser@example.com',
      };

      const mockUUID = 'u2a4f3b9-1d2e-4f8a-9b3c-1e1h5a4b5c6d';
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
    it('Обновление пользователя', () => {
      const updateDto: UpdateUserDto = {
        name: 'Updated User',
        birthdate: '2026-07-25',
        email: 'updated@example.com',
      };

      const result = service.update(testUser.id, updateDto);

      expect(result).toEqual({
        ...testUser,
        ...updateDto,
      });

      const updatedUser = service.findById(testUser.id);
      expect(updatedUser.name).toBe('Updated User');
      expect(updatedUser.email).toBe('updated@example.com');
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('Удаление пользователя', () => {
      const result = service.delete(testUser.id);

      expect(result).toEqual(testUser);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });
});
