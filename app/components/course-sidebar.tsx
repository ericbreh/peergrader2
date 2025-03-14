import { Home, Users, Settings, PenBox, HashIcon } from "lucide-react"
import { Link } from "react-router";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "~/components/ui/sidebar"
import { Course, User } from "~/lib/types";
import { H3, Small } from "./ui/typography";

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
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link to={`/courses/${course.course_id}`}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <HashIcon className="h-4 w-4" />
                                </div>
                                <div className="grid flex-1 text-left text-2xl leading-tight">
                                    <H3 className="truncate">
                                        {course.number}
                                    </H3>
                                </div>
                            </Link>
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
                                            <Small className="font-normal">{item.title}</Small>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
