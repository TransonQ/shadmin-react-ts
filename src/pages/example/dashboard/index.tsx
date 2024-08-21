import {
  InlineStack,
  Page
} from "@/components"
import { AreaChartDemo } from "./area-chart-demo"

export const DashboardExmaple = () => {
  return (
    <Page title="DashboardExmaple" fullWidth>
      <InlineStack gap="lg" wrap>
        <AreaChartDemo />
      </InlineStack>
    </Page>
  )
}
