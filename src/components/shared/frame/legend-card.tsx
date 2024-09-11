import { cn } from "@/lib"
import { useFrameConfig } from "."

import { isReactElement } from "../../lib"
import { Card, CardContent, CardHeader } from "../../ui/card"
import { Show } from "../show"
import { Text } from "../text"

interface LegendCardProps {
  children?: React.ReactNode
  sectioned?: boolean
  className?: string
  title?: React.ReactNode
  sticky?: boolean
}

export const LegendCard = ({
  children,
  sectioned,
  className,
  title,
  sticky,
}: LegendCardProps) => {
  const { headerHeight } = useFrameConfig()

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

export const LegendCardSection = CardContent
