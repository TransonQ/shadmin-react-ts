import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icon,
  Layout,
  Modal,
  Page,
  popper,
  PresetCard,
} from "@/components"
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react"
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
        content: "Toast",
        icon: <Icon source={ArrowRightIcon} />,
        onAction: () => {
          popper.error("Lorem ipsum dolor sit amet consectetur, adipiscing elit mattis. ")
          console.log(111)
        },
      }}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Bills" }]}
    >
      <Alert className="mb-4" variant="destructive">
        <Icon source={AlertCircleIcon} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>123123</AlertDescription>
      </Alert>

      <Layout>
        <Layout.Section>
          <PresetCard title={"预设卡片标题"} sectioned>
            <div className="h-[2000px]">123123</div>
          </PresetCard>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <PresetCard sticky sectioned title={"Heading 标题"}></PresetCard>
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
