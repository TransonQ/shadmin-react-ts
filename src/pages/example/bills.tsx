import {
  Alert,
  AlertDescription,
  AlertTitle,
  ContextualSaveBar,
  Icon,
  Layout,
  NavigationBlocker,
  Page,
  popper,
  PresetCard,
} from "@/components"
import { lorem } from "@/mocks/mock-data"
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react"
import { useState } from "react"

export const Bills = () => {
  const [active1, setActive1] = useState(false)
  const [isBlocked, setIsBlocked] = useState(true)
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
      <NavigationBlocker isBlocked={isBlocked} />

      <Alert variant="destructive">
        <Icon source={AlertCircleIcon} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{lorem(10)}</AlertDescription>
        <AlertDescription>{lorem(14)}</AlertDescription>
      </Alert>

      {active1 && (
        <ContextualSaveBar
          saveAction={{ content: "Save", onAction: () => setIsBlocked(false) }}
          discardAction={{ content: "Discard" }}
          message="Not saved"
        />
      )}

      <Layout>
        <Layout.Section>
          <PresetCard title={"预设卡片标题 1"} sectioned>
            <div className="h-[2000px]">{lorem(200)}</div>
          </PresetCard>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <PresetCard sticky sectioned title={"Heading 标题1"}>
            {lorem(40)}
          </PresetCard>
        </Layout.Section>
      </Layout>
      <Layout>
        <Layout.Section>
          <PresetCard title={"预设卡片标题 2"} sectioned>
            <div className="h-[2000px]">{lorem(200)}</div>
          </PresetCard>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <PresetCard sticky sectioned title={"Heading 标题2"}>
            {lorem(100)}
          </PresetCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
