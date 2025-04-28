'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { createProject, updateProject } from '@/lib/api';
import { Project } from '@repo/api/projects/entities/project.entity';

// Define form validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
});

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && project) {
        await updateProject(project.id, values);
      } else {
        await createProject(values);
      }
      // Redirect to projects list after successful submission
      router.push('/projects');
      router.refresh();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      {error && (
        <Alert className="mb-4 bg-red-50 text-red-800 border-red-300">
          {error}
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormDescription>The name of your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter project description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the purpose of your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/projects')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditing
                ? 'Update Project'
                : 'Create Project'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
