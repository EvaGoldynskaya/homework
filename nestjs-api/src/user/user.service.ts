import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

export type UserRecord = { id: string; name: string; birthdate: string; email: string };

export type UserListResult = {
  data: UserRecord[];
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
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(name?: string, page?: number, limit?: number): Promise<UserRecord[] | UserListResult> {
    const where: Prisma.UserWhereInput | undefined = name
    ? {
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : undefined;

    if (page === undefined && limit === undefined) {
      return this.prisma.user.findMany({ where });
    }

    const safePage = Math.max(1, page ?? 1);
    const safeLimit = Math.min(100, Math.max(1, limit ?? 10));
    const skip = (safePage - 1) * safeLimit;

    const query = [
      this.prisma.user.findMany({
        where,
        skip,
        take: safeLimit,
      }),
      this.prisma.user.count({ where }),
    ];

    const [data, total] = (typeof this.prisma.$transaction === 'function'
      ? await this.prisma.$transaction(query)
      : await Promise.all(query)) as [UserRecord[], number];

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
    } satisfies UserListResult;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
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
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === 'P2025') {
        return false;
      }

      throw error;
    }
  }
}
