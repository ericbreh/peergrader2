import { Home, Users, Settings, PenBox } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Course } from "~/types";

interface CourseSidebarProps {
    course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
    const items = [
        {
            title: "Dashboard",
            url: `/courses/${course.course_id}`,
            icon: Home,
        },
        {
            title: "Assignments",
            url: `/courses/${course.course_id}/assignments`,
            icon: PenBox,
        },
        {
            title: "Students",
            url: `/courses/${course.course_id}/students`,
            icon: Users,
        },
        {
            title: "Settings",
            url: `/courses/${course.course_id}/settings`,
            icon: Settings,
        },
    ]

    return (
        <Sidebar collapsible="icon" className="px-4">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href={`/courses/${course.course_id}`}>
                                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{course.number}</h2>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
