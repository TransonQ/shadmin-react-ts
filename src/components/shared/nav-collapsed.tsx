import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import { buttonVariants } from "../ui/button"

export const NavCollapsed = () => {
  const [navCollapsed, setNavCollapsed] = useNavCollapse()

  return !navCollapsed ? (
    <PanelLeftCloseIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500"
      )}
      onClick={() => setNavCollapsed(true)}
    />
  ) : (
    <PanelLeftOpenIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500"
      )}
      onClick={() => setNavCollapsed(false)}
    />
  )
}
