import { cn } from "~/lib/utils";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageContentProps) {
  return (
    <header>
      <h2 className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4",
        className
      )}>
        {children}
      </h2>
    </header>
  );
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
