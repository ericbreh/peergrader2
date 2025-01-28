import { Link } from "react-route
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { UserProfile } from "./user-profile";
import { User } from "~/types";

interface NavigationProps {
  user: User;
}

export function Navigation({ user }: NavigationProps) {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/dashboard" className="font-bold text-xl">
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
