import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Icon,
  Layout,
  Modal,
  Page,
  Text,
} from "@/components"
import { ArrowRightIcon } from "lucide-react"
import { useState } from "react"

export const Bills = () => {
  const [active, setActive] = useState(false)
  return (
    <Page
      fullWidth
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
      <Layout>
        <Layout.Section variant="quarter">
          <Card className="sticky top-[calc(56px+1rem)]">
            <CardHeader>
              <Text as="h2" variant="headingMd">
                Heading 标题
              </Text>
              <div>
                <Button onClick={() => setActive(true)}>click</Button>
              </div>
            </CardHeader>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card className="h-[2000px]">
            <CardHeader>
              <Text as="h2" variant="headingMd">
                Heading 标题
              </Text>
              <div>
                <Button onClick={() => setActive(true)}>click</Button>
              </div>
            </CardHeader>
          </Card>
        </Layout.Section>
        <Layout.Section variant="quarter">
          <Card>
            <CardContent>123</CardContent>
          </Card>
        </Layout.Section>
      </Layout>
      <Modal
        open={active}
        onClose={() => setActive(false)}
        title="弹框 Title"
        primaryAction={{
          content: "Primary",
          onAction: () => setActive(false),
          destructive: true,
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
