import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from '@repo/api/projects/dto/create-project.dto';
import { UpdateProjectDto } from '@repo/api/projects/dto/update-project.dto';
import { Project } from '@repo/api/projects/entities/project.entity';
import { PaginatedResponse } from '@repo/api/index';

interface PaginationParams {
  page: number;
  limit: number;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll(params: PaginationParams): Promise<PaginatedResponse<Project>> {
    const { page, limit } = params;

    // Make sure page and limit are valid
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 ? limit : 10;

    // Calculate skip for pagination
    const skip = (validPage - 1) * validLimit;

    // Get total count of projects
    const total = await this.prisma.project.count();

    // Get paginated projects
    const data = await this.prisma.project.findMany({
      skip,
      take: validLimit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / validLimit);

    return {
      data,
      meta: {
        total,
        page: validPage,
        limit: validLimit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
    } catch (error) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.project.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
