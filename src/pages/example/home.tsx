import type { PageWidth } from "@/components/lib"
import {
  BlockStack,
  ContextualSaveBar,
  Icon,
  InlineStack,
  Layout,
  NavigationBlocker,
  Page,
  popper,
  PresetCard,
} from "@/components/shared"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { lorem } from "@/mocks/mock-data"
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  const [isSavebarActive, setIsSavebarActive] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [pageWidth, setPageWidth] = useState<PageWidth>("defaultWidth")

  return (
    <Page
      fullWidth={pageWidth === "fullWidth"}
      formWith={pageWidth === "formWidth"}
      narrowWidth={pageWidth === "narrowWidth"}
      title="App - Home"
      breadcrumbs={[
        { label: "Login", to: "/login" },
        { label: "Home", to: "/" },
        { label: "Bills" },
      ]}
      backAction={() => navigate("/login")}
      primaryAction={{
        content: "Togggle savebar",
        icon: <Icon source={ArrowRightIcon} />,
        onAction: () => setIsSavebarActive(!isSavebarActive),
      }}
      secondaryActions={[
        {
          content: "Secondary Action 1",
          onAction() {
            popper.success("Secondary Action 1")
          },
        },
        {
          content: "Secondary Action 2",
          onAction: () => popper.error("Secondary Action 2"),
        },
      ]}
    >
      <NavigationBlocker isBlocked={isBlocked} />

      {isSavebarActive && (
        <ContextualSaveBar
          pageWidth={pageWidth}
          saveAction={{
            content: "Save",
            onAction: () => {
              setIsSavebarActive(false)
              popper.success("Saved")
            },
          }}
          discardAction={{
            content: "Discard",
            onAction: () => setIsSavebarActive(false),
          }}
          message="Not saved"
        />
      )}

      <Layout>
        <Layout.Section>
          <BlockStack gap="lg" inlineAlign="stretch">
            <PresetCard title={"Page width"} sectioned>
              <Select
                value={pageWidth}
                onValueChange={(value) => setPageWidth(value as PageWidth)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select page width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{"Page width"}</SelectLabel>
                    <SelectItem value="defaultWidth">
                      {"defaultWidth"}
                    </SelectItem>
                    <SelectItem value="fullWidth">{"fullWidth"}</SelectItem>
                    <SelectItem value="formWidth">{"formWidth"}</SelectItem>
                    <SelectItem value="narrowWidth">{"narrowWidth"}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PresetCard>

            <PresetCard title={"Button"} sectioned>
              <InlineStack gap="lg" wrap>
                <Button variant={"default"}>{"default"}</Button>
                <Button variant={"secondary"}>{"secondary"}</Button>
                <Button variant={"destructive"}>{"destructive"}</Button>
                <Button variant={"outline"}>{"outline"}</Button>
                <Button variant={"ghost"}>{"ghost"}</Button>
                <Button variant={"link"}>{"link"}</Button>
              </InlineStack>
            </PresetCard>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <PresetCard sticky sectioned title={"Navigation blocker"}>
            <Alert variant="info" className="mb-4">
              <Icon source={AlertCircleIcon} />
              <AlertTitle>
                {"Navigation blocker status: "}
                {isBlocked ? "true" : "false"}
              </AlertTitle>
              {isBlocked && (
                <AlertDescription className="mt-4">
                  {"Try to navigate away from this page"}
                </AlertDescription>
              )}
            </Alert>
            <InlineStack gap="lg" wrap>
              <Button variant={"outline"} onClick={() => setIsBlocked(false)}>
                {"Unblock navigation"}
              </Button>
              <Button variant={"outline"} onClick={() => setIsBlocked(true)}>
                {"Block navigation"}
              </Button>
            </InlineStack>
          </PresetCard>
        </Layout.Section>
      </Layout>

      <Layout>
        <Layout.Section>
          <PresetCard title={"Alert"} sectioned>
            <BlockStack gap="lg">
              <Alert variant="info">
                <Icon source={AlertCircleIcon} />
                <AlertTitle>{"Info alert"}</AlertTitle>
                <AlertDescription>{lorem(10)}</AlertDescription>
                <AlertDescription>{lorem(14)}</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <Icon source={AlertCircleIcon} />
                <AlertTitle>{"Destructive alert"}</AlertTitle>
                <AlertDescription>{lorem(10)}</AlertDescription>
                <AlertDescription>{lorem(14)}</AlertDescription>
              </Alert>
            </BlockStack>
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
