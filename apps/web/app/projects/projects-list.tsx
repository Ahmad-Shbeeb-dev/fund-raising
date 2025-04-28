'use client';

import { DeleteProjectDialog } from '@/components/delete-project-dialog';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProjects } from '@/hooks/useProjects';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProjectsListProps {
  page: number;
  limit: number;
}

export function ProjectsList({ page, limit }: ProjectsListProps) {
  const router = useRouter();
  const { projects, pagination, loading, error } = useProjects(page, limit);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4 text-sm text-red-800">
        Error: {error}
      </div>
    );
  }

  if (projects?.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No projects found</h3>
        <p className="text-muted-foreground mt-2">
          Get started by creating a new project
        </p>
        <Button className="mt-4" asChild>
          <Link href="/projects/new">Create Project</Link>
        </Button>
      </div>
    );
  }

  function handlePageChange(newPage: number) {
    router.push(`/projects?page=${newPage}&limit=${limit}`);
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:underline text-blue-600"
                  >
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(project.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/edit/${project.id}`}>Edit</Link>
                    </Button>
                    <DeleteProjectDialog
                      project={project}
                      trigger={
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page - 1);
                  }}
                />
              </PaginationItem>
            )}

            {Array.from({ length: pagination.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < pagination.totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
