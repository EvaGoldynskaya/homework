import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

describe('TaskController', () => {
  let controller: TaskController;

  const mockTaskService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Все задачи', () => {
    const expectedResult = [{ id: '1', name: 'Task 1' }];
    mockTaskService.findAll.mockReturnValue(expectedResult);

    const result = controller.getTask('Task', 'user-1');

    expect(mockTaskService.findAll).toHaveBeenCalledWith('Task', 'user-1');
    expect(result).toEqual(expectedResult);
  });

  it('Задача по id', () => {
    const expectedResult = { id: '1', name: 'Task 1' };
    mockTaskService.findById.mockReturnValue(expectedResult);

    const result = controller.getTaskById('1');

    expect(mockTaskService.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedResult);
  });

  it('Создание задачи', () => {
    const createDto: CreateTaskDto = {
      name: 'New Task',
      userId: 'user-1',
      description: 'Description',
      deadline: '2026-09-01',
      status: 'INPROG',
    };
    const expectedResult = { id: 'task-1', ...createDto };
    mockTaskService.create.mockReturnValue(expectedResult);

    const result = controller.createTask(createDto);

    expect(mockTaskService.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(expectedResult);
  });

  it('Обновление задачи', () => {
    const updateDto: UpdateTaskDto = {
      name: 'Updated Task',
      description: 'Updated description',
      status: 'DONE',
    };
    const expectedResult = { id: '1', name: 'Updated Task', description: 'Updated description', status: 'DONE' };
    mockTaskService.update.mockReturnValue(expectedResult);

    const result = controller.updateTask('1', updateDto);

    expect(mockTaskService.update).toHaveBeenCalledWith('1', updateDto);
    expect(result).toEqual(expectedResult);
  });

  it('Удаление задачи', () => {
    const expectedResult = { id: '1', name: 'Deleted Task' };
    mockTaskService.delete.mockReturnValue(expectedResult);

    const result = controller.deleteUser('1');

    expect(mockTaskService.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedResult);
  });
});
