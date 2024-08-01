import { cn } from "@/lib"
import { ClassNameValue } from "tailwind-merge"
import { PageBreadcrumb, PageBreadcrumbProps } from "./page-breadcrumb"
import { PageHeader, PageHeaderProps } from "./page-header"

interface PageProps extends PageHeaderProps {
  children?: React.ReactNode
  className?: ClassNameValue
  fullWidth?: boolean
  formWith?: boolean
  narrowWidth?: boolean
  breadcrumbs?: PageBreadcrumbProps[]
}

export const Page = ({
  children,
  className,
  fullWidth,
  formWith,
  narrowWidth,
  breadcrumbs,
  ...rest
}: PageProps) => {
  const headerProps = rest

  return (
    <div
      x-chunk="PAGE"
      className={cn(
        "m-auto max-w-screen-lg",
        fullWidth && "max-w-full",
        formWith && "max-w-screen-md",
        narrowWidth && "max-w-prose",
        className
      )}
    >
      <PageBreadcrumb breadcrumbs={breadcrumbs} className={"mb-2"} />
      <PageHeader {...headerProps} />
      <div x-chunk="PAGE_CONTENT">{children}</div>
    </div>
  )
}
