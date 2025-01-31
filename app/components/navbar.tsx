import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { UserProfile } from "./user-profile";
import { Course, User } from "~/types";
import { Slash, GraduationCap } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

interface NavigationProps {
  user: User | null;
  course: Course | null;
}

export function Navbar({ user, course }: NavigationProps) {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-14 items-center px-8 mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="flex items-center gap-2 font-bold">
                <GraduationCap className="h-5 w-5" />
                PeerGrader
              </BreadcrumbLink>
            </BreadcrumbItem>
            {course && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/courses/${course.course_id}`}>{course.number}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {/* TODO: add assignment id*/}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <UserProfile user={user} />
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/signup" className="text-sm font-medium">
                Sign Up
              </Link>
              <Link to="/login" className="text-sm font-medium">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
