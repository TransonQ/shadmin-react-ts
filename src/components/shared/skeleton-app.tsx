import { LoaderIcon } from "lucide-react"
import { Skeleton } from "../ui"
import { BlockStack } from "./block-stack"
import { Frame } from "./frame"
import { InlineStack } from "./inline-stack"
import { Page } from "./page"

export const SkeletonApp = () => {
  return (
    <Frame>
      <Frame.Header>
        <InlineStack
          blockAlign="center"
          align="space-between"
          className="h-full p-4"
        >
          <Skeleton className="w-52 h-8" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </InlineStack>
      </Frame.Header>
      <Frame.Navbar>
        <BlockStack gap="lg" className="p-4">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </BlockStack>
      </Frame.Navbar>
      <Frame.Main>
        <div className="absolute inset-[56px_0_0_240px] z-10 grid place-items-center">
          <LoaderIcon className="w-20 h-20 animate-spin text-muted-foreground/20 -mt-40" />
        </div>
        <Page className="h-[calc(100vh-90px)]">
          <BlockStack gap="lg">
            <InlineStack gap="lg" align="space-between" fullWidth>
              <Skeleton className="w-64 h-10" />
              <Skeleton className="w-14 h-10" />
            </InlineStack>
            <Skeleton className="w-full h-60" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-4/5 h-6" />
          </BlockStack>
        </Page>
      </Frame.Main>
    </Frame>
  )
}
