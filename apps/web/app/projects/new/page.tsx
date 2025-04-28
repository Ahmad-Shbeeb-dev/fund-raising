import { ProjectForm } from '@/components/project-form';

export const metadata = {
  title: 'Create Project',
  description: 'Create a new project',
};

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <div className="max-w-3xl">
        <ProjectForm />
      </div>
    </div>
  );
}
