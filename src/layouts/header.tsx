import { MenuDestructableItem } from "@/components/shared"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui"
import { useAuth } from "@/hooks"
import { cn } from "@/lib"
import { LinkIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Header = () => {
  return (
    <div className="pr-4 w-full h-full flex items-center justify-end">
      <GithubButton />
      <UserMenu />
    </div>
  )
}

function GithubButton() {
  return (
    <Button
      variant={"link"}
      className="px-1"
      onClick={() =>
        window.open("https://github.com/TransonQ/shadmin-react-ts")
      }
    >
      <span>Github</span> <LinkIcon className="h-4 w-4 ml-1" />
    </Button>
  )
}

function UserMenu() {
  const navigate = useNavigate()
  const { error, data } = useAuth()

  if (error) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "data-[state=open]:bg-accent",
            "relative h-10 pr-2 flex items-center gap-2"
          )}
        >
          <span>{data?.usename}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={data?.avatar} alt="@shadcn" />
            <AvatarFallback>{data?.usename}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{"shadmin"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <MenuDestructableItem
          content="Log out"
          destructive
          onAction={() => {
            navigate("/login")
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
