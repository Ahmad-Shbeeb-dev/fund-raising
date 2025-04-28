import { notFound } from 'next/navigation';
import { ProjectDetails } from '@/components/project-details';
import { getProject } from '@/lib/api';

export const metadata = {
  title: 'Project Details',
};

export default async function ProjectPage({
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
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <ProjectDetails project={project} />
    </div>
  );
}
