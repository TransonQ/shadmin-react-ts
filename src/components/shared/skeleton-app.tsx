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
        <Page>
          <BlockStack gap="lg">
            <InlineStack gap="lg" align="space-between" fullWidth>
              <Skeleton className="w-24 h-10" />
              <Skeleton className="w-24 h-10" />
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
