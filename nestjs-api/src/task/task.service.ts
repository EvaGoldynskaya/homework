import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

export type TaskRecord = {
  id: string;
  name: string;
  userId: string;
  description: string;
  deadline: string;
  status: string;
};

export type TaskListResult = {
  data: TaskRecord[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(name?: string, userId?: string, page?: number, limit?: number): Promise<TaskRecord[] | TaskListResult> {
    const where: Prisma.TaskWhereInput | undefined = {
      ...(name
        ? {
            name: {
              contains: name,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
      ...(userId ? { userId } : {}),
    };

    if (page === undefined && limit === undefined) {
      return this.prisma.task.findMany({ where });
    }

    const safePage = Math.max(1, page ?? 1);
    const safeLimit = Math.min(100, Math.max(1, limit ?? 10));
    const skip = (safePage - 1) * safeLimit;

    const query = [
      this.prisma.task.findMany({
        where,
        skip,
        take: safeLimit,
      }),
      this.prisma.task.count({ where }),
    ];

    const [data, total] = (typeof this.prisma.$transaction === 'function'
      ? await this.prisma.$transaction(query)
      : await Promise.all(query)) as [TaskRecord[], number];

    const totalItems = Number(total);
    const totalPages = Math.ceil(totalItems / safeLimit);

    return {
      data,
      meta: {
        total: totalItems,
        page: safePage,
        limit: safeLimit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },
    } satisfies TaskListResult;
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === 'P2025') {
        return false;
      }

      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === 'P2025') {
        return false;
      }

      throw error;
    }
  }
}
