import { useEffect, useState } from 'react';
import { Project } from '@repo/api/projects/entities/project.entity';
import { PaginatedResponse } from '@repo/api';
import { getProjects } from '@/lib/api';

interface UseProjectsResult {
  projects: Project[];
  pagination: PaginatedResponse<Project>['meta'] | null;
  loading: boolean;
  error: string | null;
}

export function useProjects(page: number, limit: number): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<
    PaginatedResponse<Project>['meta'] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await getProjects(page, limit, abortController.signal);
        setProjects(response.data);
        setPagination(response.meta);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching projects:', err);
          setError(
            err instanceof Error ? err.message : 'Failed to load projects',
          );
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProjects();

    return () => {
      abortController.abort();
    };
  }, [page, limit]);

  return { projects, pagination, loading, error };
}
