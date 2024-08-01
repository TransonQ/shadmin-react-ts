import { Button, Card, CardHeader, Icon, Modal, Page, Text } from "@/components"
import { ArrowRightIcon } from "lucide-react"
import { useState } from "react"

export const Bills = () => {
  const [active, setActive] = useState(false)
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
          <Button onClick={() => setActive(true)}>click</Button>
        </CardHeader>
      </Card>
      <Modal
        open={active}
        onClose={() => setActive(false)}
        title="弹框 Title"
        primaryAction={{
          content: "Primary",
          onAction: () => setActive(false),
        }}
        secondaryAction={{
          content: "Secondary",
          onAction: () => setActive(false),
        }}
      >
        <Modal.Section>123</Modal.Section>
        <Modal.Section>123</Modal.Section>
      </Modal>
    </Page>
  )
}
