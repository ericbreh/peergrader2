import { Link, useMatches } from "@remix-run/react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";

export function Navigation() {
    // TODO: I'm not sure if this is the most optimal, look into different options. Parent layout?
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
                    <Link to="/signup" className="text-sm font-medium">
                        Sign Up
                    </Link>
                    <Link to="/login" className="text-sm font-medium">
                        Login
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}