'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteProjectDialog } from '@/components/delete-project-dialog';
import { Project } from '@repo/api/projects/entities/project.entity';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const createdDate = new Date(project.createdAt).toLocaleDateString();
  const updatedDate = new Date(project.updatedAt).toLocaleDateString();

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">{project.name}</CardTitle>
        <CardDescription>
          Created on {createdDate}, Last updated on {updatedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {project.description ? (
          <p className="whitespace-pre-wrap">{project.description}</p>
        ) : (
          <p className="text-muted-foreground italic">
            No description provided
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
        <Button asChild>
          <Link href={`/projects/edit/${project.id}`}>Edit Project</Link>
        </Button>
        <DeleteProjectDialog
          project={project}
          trigger={<Button variant="destructive">Delete</Button>}
        />
      </CardFooter>
    </Card>
  );
}
