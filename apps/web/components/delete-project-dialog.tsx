'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteProject } from '@/lib/api';
import { Project } from '@repo/api/projects/entities/project.entity';

interface DeleteProjectDialogProps {
  project: Project;
  trigger: React.ReactNode;
}

export function DeleteProjectDialog({
  project,
  trigger,
}: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteProject(project.id);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the project &quot;{project.name}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="rounded-md bg-red-50 p-4 my-4 text-sm text-red-800">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
