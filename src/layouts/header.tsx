import { Avatar, AvatarFallback } from "@/components"

export const Header = () => {
  return (
    <div className="pr-4 w-full h-full flex items-center justify-end">
      <Avatar>
        <AvatarFallback className="bg-indigo-600 text-background">
          User
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
