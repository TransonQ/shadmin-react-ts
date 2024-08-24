import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleHelpIcon,
  CircleIcon,
  CircleSlashIcon,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelpIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: CircleDotIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheckIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleSlashIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
