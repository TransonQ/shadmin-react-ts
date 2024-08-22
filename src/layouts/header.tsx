import { Avatar, AvatarFallback } from "@/components/ui"

export const Header = () => {
  return (
    <div className="pr-4 w-full h-full flex items-center justify-end">
      <Avatar className="w-9 h-9">
        <AvatarFallback className="bg-blue-700 text-background text-xs">
          {"Admin"}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
