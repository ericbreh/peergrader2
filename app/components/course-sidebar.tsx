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
import { Course, User } from "~/types";

interface CourseSidebarProps {
    course: Course;
    user: User;
}

export function CourseSidebar({ course, user }: CourseSidebarProps) {
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
        ...(user.is_teacher ? [
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
        ] : [])
    ]

    return (
        <Sidebar collapsible="icon" className="px-4">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="ml-2">
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{course.number}</h2>
                            <p className="text-sm text-muted-foreground">{course.name}</p>
                        </div>
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
