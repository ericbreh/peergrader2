import { Navigation } from "../../components/navigation";
import type { User } from "~/types";

interface MainLayoutProps {
    children: React.ReactNode;
    user: User;
}

export function MainLayout({ children, user }: MainLayoutProps) {
    return (
        <>
            <Navigation user={user} />
            {children}
        </>
    );
}

interface PageHeaderProps {
    children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
    return (
        <header className="border-b py-6">
            <div className="max-w-7xl mx-auto px-4">
                {children}
            </div>
        </header>
    );
}

export function PageContent({ children }: PageHeaderProps) {
    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
        </main>
    );
}
