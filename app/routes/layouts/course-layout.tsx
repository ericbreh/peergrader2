import { SidebarProvider } from "~/components/ui/sidebar"
import { CourseSidebar } from "~/components/course-sidebar"
import { Outlet } from "react-router"

export default function CourseLayout() {
    return (
        <div>
            <SidebarProvider>
                <aside>
                    <CourseSidebar />
                </aside>
                <div className="flex-1">
                    <Outlet />
                </div>
            </SidebarProvider>
        </div>
    );
}
