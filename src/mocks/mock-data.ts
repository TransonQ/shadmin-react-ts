import { NavgationItemProps } from "@/components"
import { SettingsIcon, UserIcon } from "lucide-react"

export const mockNavs: NavgationItemProps[] = [
  {
    url: "/app",
    icon: UserIcon,
    label: "Profile",
    items: [
      {
        icon: UserIcon,
        url: "/app/profile",
        label: "Profile",
      },
    ],
  },
  {
    url: "/app/settings",
    icon: SettingsIcon,
    label: "Settings",
  },
]
