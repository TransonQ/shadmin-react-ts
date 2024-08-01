import { cn } from "@/lib"
import { ClassNameValue } from "tailwind-merge"
import { PageBreadcrumb, PageBreadcrumbProps } from "./page-breadcrumb"
import { PageHeader, PageHeaderProps } from "./page-header"

interface PageProps extends PageHeaderProps {
  children?: React.ReactNode
  className?: ClassNameValue
  fullWidth?: boolean
  breadcrumbs?: PageBreadcrumbProps[]
}

export const Page = ({
  children,
  className,
  fullWidth,
  breadcrumbs,
  ...rest
}: PageProps) => {
  const headerProps = rest

  return (
    <div x-chunk="PAGE" className={cn(className)}>
      <PageBreadcrumb breadcrumbs={breadcrumbs} className={"mb-2"} />
      <PageHeader {...headerProps} />
      <div x-chunk="PAGE_CONTENT">{children}</div>
    </div>
  )
}
