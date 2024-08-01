import { Card, CardHeader, Icon, Page, Text } from "@/components"
import { ArrowRightIcon } from "lucide-react"

export const Bills = () => {
  return (
    <Page
      className="h-[2000px]"
      title="App - Bills"
      backAction={() => {
        console.log("back")
      }}
      primaryAction={{
        content: "Primary",
        loading: true,
        icon: <Icon source={ArrowRightIcon} />,
        onAction: () => {
          console.log("primary")
        },
      }}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Bills" }]}
    >
      <Card>
        <CardHeader>
          <Text as="h2" variant="headingMd">
            Heading 标题
          </Text>
        </CardHeader>
      </Card>
    </Page>
  )
}
