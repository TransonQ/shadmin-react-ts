import { NavgationItemProps } from "@/components"
import { SettingsIcon, UserIcon } from "lucide-react"

export const navs: NavgationItemProps[] = [
  {
    url: "/app/dashboard",
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
