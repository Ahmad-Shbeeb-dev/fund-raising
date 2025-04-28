import { CreateProjectDto } from './projects/dto/create-project.dto';
import { UpdateProjectDto } from './projects/dto/update-project.dto';
import { Project } from './projects/entities/project.entity';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const projects = {
  dto: {
    CreateProjectDto,
    UpdateProjectDto,
  },
  entities: {
    Project,
  },
};
