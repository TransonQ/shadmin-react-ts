import { cn } from "@/lib";
import type { ClassNameValue } from "tailwind-merge";
import type { PageWidth } from "../calc";
import { calcPageWidth } from "../calc";
import type { PageBreadcrumbProps } from "./page-breadcrumb";
import { PageBreadcrumb } from "./page-breadcrumb";
import type { PageHeaderProps } from "./page-header";
import { PageHeader } from "./page-header";

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
    w = "formWidth"
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
