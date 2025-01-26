// import { SidebarProvider } from "~/components/ui/sidebar"
// import { CourseSidebar } from "~/components/course-sidebar"
import { Outlet } from "react-router"
import { PageHeader } from "./main-layout";

export default function CourseLayout() {
    return (
        <div>
            <PageHeader>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Course Name
                </h2>
            </PageHeader>
            <div className="flex h-screen">
                <aside className="w-64 bg-blue-500">
                </aside>
                <div className="flex-1 max-w-7xl px-16 py-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
