import type { NavgationItemProps } from "@/components/shared"
import {
  CircleHelpIcon,
  GaugeIcon,
  HomeIcon,
  LockIcon,
  NotepadTextIcon,
  ServerOffIcon,
  TableIcon,
} from "lucide-react"

export const navs: NavgationItemProps[] = [
  {
    url: "/app/home",
    icon: HomeIcon,
    label: "Home",
  },
  {
    url: "/app/dashboard",
    icon: GaugeIcon,
    label: "Dashboard",
  },
  {
    url: "/app/table",
    icon: TableIcon,
    label: "Table",
  },
  {
    url: "/app/form",
    icon: NotepadTextIcon,
    label: "Form",
  },
  {
    url: "/app/404",
    icon: CircleHelpIcon,
    label: "404 Not Found",
  },
  {
    url: "/app/noAccess",
    icon: LockIcon,
    label: "403 No Access",
  },
  {
    url: "/app/error",
    icon: ServerOffIcon,
    label: "500 Server Error",
  },
]
