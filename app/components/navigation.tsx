import { Link, useLoaderData, useMatches } from "@remix-run/react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { UserProfile } from "./user-profile";
import { User } from "~/types";

interface NavigationProps {
    user: User;
}

export function Navigation({ user }: NavigationProps) {
    // TODO: I'm not sure if this is the most optimal way to display navbar on some pages but not others, look into different options
    const matches = useMatches();
    const currentPath = matches[matches.length - 1].pathname;
    const hideNavRoutes = ["/login", "/signup"];

    if (hideNavRoutes.includes(currentPath)) return null;

    return (
        <nav className="border-b bg-background">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/" className="font-bold text-xl">
                                PeerGrader
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

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