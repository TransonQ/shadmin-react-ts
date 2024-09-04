import githubIcon from "@/assets/github.svg"
import { MenuItem } from "@/components/shared"
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
import { clearLocalStorage, cn } from "@/lib"
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
      variant={"ghost"}
      className="px-3 rounded-full border border-transparent hover:border-border"
      onClick={() =>
        window.open("https://github.com/TransonQ/shadmin-react-ts")
      }
    >
      <img src={githubIcon} className="w-5 h-5" />
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
          <DropdownMenuItem
            onClick={() => {
              clearLocalStorage()
              window.location.reload()
            }}
          >
            Clear LocalStorage
            <DropdownMenuShortcut>delete</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <MenuItem
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
