import { cn } from "@/lib"
import { isReactElement } from "../lib"
import { Card, CardContent, CardHeader } from "../ui/card"
import { frameVariants } from "./config"
import { Show } from "./show"
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

  const content = (
    <Show when={sectioned && !!children} fallback={children}>
      <CardContent className={cn(!title && "pt-4")}>{children}</CardContent>
    </Show>
  )

  const titleMarkup = (
    <Show when={!isReactElement(title) && title} fallback={title}>
      <CardHeader>
        <Text as="h2" variant="headingMd">
          {title}
        </Text>
      </CardHeader>
    </Show>
  )

  return (
    <Card style={styles} className={cn(className)}>
      {titleMarkup}
      {content}
    </Card>
  )
}
