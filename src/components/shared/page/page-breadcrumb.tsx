import { cn } from "@/lib"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb"

export type PageBreadcrumbProps = {
  label: string
  to?: string
}

export const PageBreadcrumb = ({
  breadcrumbs = [],
  className,
}: {
  breadcrumbs?: PageBreadcrumbProps[]
  className?: string
}) => {
  if (!breadcrumbs || breadcrumbs?.length === 0) return

  const expandedMenu = breadcrumbs.map(({ label, to }, index) => {
    if (index < breadcrumbs.length - 1)
      return (
        <div key={index} className="flex items-center gap-2.5">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={to || ""}>{label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </div>
      )

    return (
      <BreadcrumbItem key={index}>
        <BreadcrumbPage>{label}</BreadcrumbPage>
      </BreadcrumbItem>
    )
  })

  return (
    <nav className={cn("flex items-center", className)}>
      <Breadcrumb>
        <BreadcrumbList>{expandedMenu}</BreadcrumbList>
      </Breadcrumb>
    </nav>
  )
}
