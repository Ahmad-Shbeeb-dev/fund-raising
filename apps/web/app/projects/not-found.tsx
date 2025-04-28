import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto py-12 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The project you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/projects">Back to Projects</Link>
      </Button>
    </div>
  );
}
