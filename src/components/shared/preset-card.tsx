import { cn } from "@/lib"
import { isReactElement } from "../calc"
import { Card, CardContent, CardHeader } from "../ui/card"
import { frameVariants } from "./config"
import { Text } from "./text"
const { headerHeight } = frameVariants
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
  const styles: React.CSSProperties = {
    position: sticky ? "sticky" : "initial",
    top: sticky ? `calc(${headerHeight}px + 1rem)` : undefined,
  }

  const content = sectioned ? <CardContent>{children}</CardContent> : children
  const titleMarkup = !isReactElement(title) ? (
    <CardHeader>
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
    </CardHeader>
  ) : (
    title
  )

  return (
    <Card style={styles} className={cn(className)}>
      {titleMarkup}
      {content}
    </Card>
  )
}
