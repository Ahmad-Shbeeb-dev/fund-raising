import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/project-form';
import { getProject } from '@/lib/api';

export const metadata = {
  title: 'Edit Project',
  description: 'Edit an existing project',
};

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  let project;

  try {
    project = await getProject(params.id);
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <div className="max-w-3xl">
        <ProjectForm project={project} isEditing={true} />
      </div>
    </div>
  );
}
