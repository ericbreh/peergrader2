import { Form, useNavigation } from "react-router";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { User } from "~/lib/types";
import { P, Small } from "./ui/typography";

interface UserProfileProps {
    user: User;
}

export function UserProfile({ user }: UserProfileProps) {
    const navigation = useNavigation();

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user.profile_image}
                            alt={`${user.first_name}'s profile picture`}
                        />
                        <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <Small>{user.first_name} {user.last_name}</Small>
                        <P className="text-xs leading-none text-muted-foreground">{user.email}</P>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Form method="post" action="/logout">
                    <DropdownMenuItem asChild>
                        <button type="submit" className="w-full cursor-pointer" disabled={navigation.formAction === "/logout"}>
                            Log out
                        </button>
                    </DropdownMenuItem>
                </Form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}