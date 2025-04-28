import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectsList } from './projects-list';

export const metadata = {
  title: 'Projects',
  description: 'Manage your projects',
};

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/projects/new" className="bg-red-400">
            Create New Project
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsList page={page} limit={limit} />
      </Suspense>
    </div>
  );
}
