import { cn } from "@/lib"
import { ClassNameValue } from "tailwind-merge"
import { calcPageWidth, PageWidth } from "../calc"
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
  let w: PageWidth = "defaultWidth"

  if (fullWidth) {
    w = "fullWidth"
  } else if (formWith) {
    w = "formWith"
  } else if (narrowWidth) {
    w = "narrowWidth"
  }

  return (
    <div
      x-chunk="PAGE"
      className={cn("m-auto max-w-screen-lg", calcPageWidth(w), className)}
    >
      <PageBreadcrumb breadcrumbs={breadcrumbs} className={"mb-2"} />
      <PageHeader {...headerProps} />
      <div x-chunk="PAGE_CONTENT" className="pb-6">
        {children}
      </div>
    </div>
  )
}
