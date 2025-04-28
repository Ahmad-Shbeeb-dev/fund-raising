import { CreateProjectDto } from '@repo/api/projects/dto/create-project.dto';
import { UpdateProjectDto } from '@repo/api/projects/dto/update-project.dto';
import { Project } from '@repo/api/projects/entities/project.entity';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Project API functions
export async function getProjects(page = 1, limit = 10, signal?: AbortSignal) {
  const response = await fetch(
    `${API_URL}/projects?page=${page}&limit=${limit}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}

export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  return response.json();
}

export async function createProject(projectData: CreateProjectDto) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
}

export async function updateProject(
  id: string,
  projectData: UpdateProjectDto,
): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Failed to update project');
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }

  return true;
}
