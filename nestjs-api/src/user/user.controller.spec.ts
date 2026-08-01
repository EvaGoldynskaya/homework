import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return users from service by name filter', () => {
    const expectedResult = [{ id: '1', name: 'John Doe' }];
    mockUserService.findAll.mockReturnValue(expectedResult);

    const result = controller.getUsers('John');

    expect(mockUserService.findAll).toHaveBeenCalledWith('John');
    expect(result).toEqual(expectedResult);
  });

  it('should return one user by id from service', () => {
    const expectedResult = { id: '1', name: 'John Doe' };
    mockUserService.findById.mockReturnValue(expectedResult);

    const result = controller.getUserById('1');

    expect(mockUserService.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedResult);
  });

  it('should create user through service', () => {
    const createDto: CreateUserDto = {
      name: 'Jane Doe',
      birthdate: '1990-01-01',
      email: 'jane@example.com',
    };
    const expectedResult = { id: 'user-1', ...createDto };
    mockUserService.create.mockReturnValue(expectedResult);

    const result = controller.createUser(createDto);

    expect(mockUserService.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(expectedResult);
  });

  it('should update user through service', () => {
    const updateDto: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };
    const expectedResult = { id: '1', name: 'Updated Name', email: 'updated@example.com' };
    mockUserService.update.mockReturnValue(expectedResult);

    const result = controller.updateUser('1', updateDto);

    expect(mockUserService.update).toHaveBeenCalledWith('1', updateDto);
    expect(result).toEqual(expectedResult);
  });

  it('should delete user through service', () => {
    const expectedResult = { id: '1', name: 'Deleted User' };
    mockUserService.delete.mockReturnValue(expectedResult);

    const result = controller.deleteUser('1');

    expect(mockUserService.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedResult);
  });
});
