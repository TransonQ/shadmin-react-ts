import {
  type BaseAction,
  type DestructableAction,
  BlockStack,
  Button,
  Card,
  InlineStack,
  Text,
} from "@/components"
import { cn } from "@/lib"
import type { LucideIcon } from "lucide-react"

interface PrimaryAction extends DestructableAction {}
interface SecondaryAction extends BaseAction {}

export const ErrorContainer = ({
  icon: Tag,
  children,
  title,
  primaryAction,
  secondaryAction,
  className,
}: {
  icon: LucideIcon
  children?: React.ReactNode
  title?: string
  primaryAction?: PrimaryAction
  secondaryAction?: SecondaryAction
  className?: string
}) => {
  return (
    <Card className={cn("w-full p-2 h-[calc(100vh-6rem)]", className)}>
      <div className="h-full max-w-prose mx-auto flex flex-col justify-center gap-8">
        <BlockStack gap="lg" className="-mt-28 mx-2">
          <Tag className="w-24 h-24 text-primary/40 flex-shrink-0" />
          <Text as="h1" variant="heading2xl">
            {title}
          </Text>
          {children}
        </BlockStack>

        <InlineStack align="end" gap="md" className="w-full px-4">
          {secondaryAction && (
            <Button variant={"outline"} onClick={secondaryAction.onAction}>
              {secondaryAction.content}
            </Button>
          )}
          {primaryAction && (
            <Button onClick={primaryAction.onAction}>
              {primaryAction.content}
            </Button>
          )}
        </InlineStack>
      </div>
    </Card>
  )
}
