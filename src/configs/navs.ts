import { NavgationItemProps } from "@/components"
import { GaugeIcon, SettingsIcon, UserIcon } from "lucide-react"

export const navs: NavgationItemProps[] = [
  {
    url: "/app/dashboard",
    icon: GaugeIcon,
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
