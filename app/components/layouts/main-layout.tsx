import { cn } from "~/lib/utils";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <main className={cn(
      "max-w-7xl mx-auto px-4 py-4",
      className
    )}>
      {children}
    </main>
  );
}
