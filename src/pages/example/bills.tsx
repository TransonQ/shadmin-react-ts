import {
  Alert,
  AlertDescription,
  AlertTitle,
  ContextualSaveBar,
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
  const [active1, setActive1] = useState(false)

  return (
    <Page
      className="h-[2000px]"
      title="App - Bills"
      backAction={() => {
        console.log("back")
        setActive1(!active1)
      }}
      primaryAction={{
        content: "Toast",
        icon: <Icon source={ArrowRightIcon} />,
        onAction: () => {
          popper.error(
            "Lorem ipsum dolor sit amet consectetur, adipiscing elit mattis. "
          )
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

      {active1 && (
        <ContextualSaveBar
          saveAction={{ content: "Save" }}
          discardAction={{ content: "Discard" }}
          message="Not saved"
        />
      )}

      <Layout>
        <Layout.Section>
          <PresetCard title={"预设卡片标题"} sectioned>
            <div className="h-[2000px]">123123</div>
          </PresetCard>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <PresetCard sticky sectioned title={"Heading 标题"}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, etiam
            quisque blandit ut conubia lobortis. Inceptos ultricies class
            suscipit diam porta odio urna morbi laoreet dictum ornare nisl,
            vivamus himenaeos nunc aptent suspendisse ut interdum purus etiam
          </PresetCard>
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
