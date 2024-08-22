import { cn } from "@/lib"
import { Children } from "react"
import { isReactElement } from "../lib"

const FormLayoutRoot = ({ children }: { children?: React.ReactNode }) => {
  return <div className="w-full flex flex-col gap-4">{children}</div>
}

FormLayoutRoot.displayName = "FormLayout"

const Group = ({
  children,
  condensed,
}: {
  children?: React.ReactNode
  condensed?: boolean
}) => {
  return (
    <div className={cn("flex gap-4 flex-wrap")}>
      {Children.map(children, (child) => {
        if (isReactElement(child)) {
          return (
            <div
              className={cn(
                "flex-grow flex-shrink",
                condensed ? "basis-24 min-w-24" : "basis-48 min-w-48"
              )}
            >
              {child}
            </div>
          )
        }
        return child
      })}
    </div>
  )
}

Group.displayName = "FormLayoutGroup"

export const FormLayout = Object.assign(FormLayoutRoot, { Group })
