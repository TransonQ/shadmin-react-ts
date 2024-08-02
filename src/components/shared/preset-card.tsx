import { cn } from "@/lib"
import { isReactElement } from "../calc"
import { Card, CardContent, CardHeader } from "../ui/card"
import { frameVariants } from "./config"
import { Text } from "./text"

interface PresetCardProps {
  children?: React.ReactNode
  sectioned?: boolean
  className?: string
  title?: React.ReactNode
  sticky?: boolean
}

export const PresetCard = ({
  children,
  sectioned,
  className,
  title,
  sticky,
}: PresetCardProps) => {
  const titleMarkup = !isReactElement(title) ? (
    <CardHeader>
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
    </CardHeader>
  ) : (
    title
  )

  const content = sectioned ? <CardContent>{children}</CardContent> : children
  return (
    <Card
      className={cn(
        sticky && "sticky",
        `top-[calc(${frameVariants.headerHeight}px+1rem)]`,
        className
      )}
    >
      {titleMarkup}
      {content}
    </Card>
  )
}
