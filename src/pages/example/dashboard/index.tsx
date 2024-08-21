import { InlineStack, Page } from "@/components"
import { AreaChartDemo } from "./area-chart-demo"
import { BarChartDemo } from "./bar-chart-demo"
import { LineChartDemo } from "./line-chart-demo"

export const DashboardExmaple = () => {
  return (
    <Page title="DashboardExmaple" fullWidth>
      <InlineStack gap="lg" wrap>
        <AreaChartDemo />
        <BarChartDemo />
        <LineChartDemo />
      </InlineStack>
    </Page>
  )
}
