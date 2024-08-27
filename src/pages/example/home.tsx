import type { PageWidth } from "@/components/lib"
import {
  BlockStack,
  ContextualSaveBar,
  Icon,
  InlineStack,
  Layout,
  LegendCard,
  LegendSelect,
  NavigationBlocker,
  Page,
  shadmin,
  StatusDot,
} from "@/components/shared"
import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui"
import { lorem } from "@/mocks/mock-data"
import { AlertCircleIcon, ArrowRightIcon, StarIcon } from "lucide-react"
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
            shadmin.toast.success("Secondary Action 1")
          },
        },
        {
          content: "Secondary Action 2",
          onAction: () => shadmin.toast.error("Secondary Action 2"),
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
              shadmin.toast.success("Saved")
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
            <LegendCard title={"Page width"} sectioned>
              <LegendSelect
                value={pageWidth}
                onChange={(value) => setPageWidth(value as PageWidth)}
                options={[
                  { label: "defaultWidth", value: "defaultWidth" },
                  { label: "fullWidth", value: "fullWidth" },
                  { label: "formWidth", value: "formWidth" },
                  { label: "narrowWidth", value: "narrowWidth" },
                ]}
              />
            </LegendCard>

            <LegendCard title={"Status Dot"} sectioned>
              <BlockStack gap="md" inlineAlign="start">
                <StatusDot label="Success" className="bg-green-500" />
                <StatusDot label="Error" className="bg-red-500" />
                <StatusDot label="Warning" bordered className="bg-yellow-500" />
                <StatusDot label="Info" bordered className="bg-blue-400" />
              </BlockStack>
            </LegendCard>

            <LegendCard title={"Button"} sectioned>
              <BlockStack gap="lg">
                <InlineStack gap="lg" wrap>
                  <Button size={"lg"} variant={"default"}>
                    {"large"}
                  </Button>
                  <Button size={"lg"} variant={"secondary"}>
                    {"large"}
                  </Button>
                  <Button size={"lg"} variant={"destructive"}>
                    {"large"}
                  </Button>
                  <Button size={"lg"} variant={"outline"}>
                    {"large"}
                  </Button>
                  <Button size={"lg"} variant={"ghost"}>
                    {"large"}
                  </Button>
                  <Button size={"lg"} variant={"link"}>
                    {"large"}
                  </Button>
                </InlineStack>
                <InlineStack gap="lg" wrap>
                  <Button variant={"default"}>{"default"}</Button>
                  <Button variant={"secondary"}>{"secondary"}</Button>
                  <Button variant={"destructive"}>{"destructive"}</Button>
                  <Button variant={"outline"}>{"outline"}</Button>
                  <Button variant={"ghost"}>{"ghost"}</Button>
                  <Button variant={"link"}>{"link"}</Button>
                </InlineStack>
                <InlineStack gap="lg" wrap>
                  <Button size={"sm"} variant={"default"}>
                    {"small"}
                  </Button>
                  <Button size={"sm"} variant={"secondary"}>
                    {"small"}
                  </Button>
                  <Button size={"sm"} variant={"destructive"}>
                    {"small"}
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    {"small"}
                  </Button>
                  <Button size={"sm"} variant={"ghost"}>
                    {"small"}
                  </Button>
                  <Button size={"sm"} variant={"link"}>
                    {"small"}
                  </Button>
                </InlineStack>
                <InlineStack gap="lg" wrap>
                  <Button size={"icon"} variant={"default"}>
                    <Icon source={StarIcon} />
                  </Button>
                  <Button size={"icon"} variant={"secondary"}>
                    <Icon source={StarIcon} />
                  </Button>
                  <Button size={"icon"} variant={"destructive"}>
                    <Icon source={StarIcon} />
                  </Button>
                  <Button size={"icon"} variant={"outline"}>
                    <Icon source={StarIcon} />
                  </Button>
                  <Button size={"icon"} variant={"ghost"}>
                    <Icon source={StarIcon} />
                  </Button>
                  <Button size={"icon"} variant={"link"}>
                    <Icon source={StarIcon} />
                  </Button>
                </InlineStack>
              </BlockStack>
            </LegendCard>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <LegendCard sticky sectioned title={"Navigation blocker"}>
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
          </LegendCard>
        </Layout.Section>
      </Layout>

      <Layout>
        <Layout.Section>
          <LegendCard title={"Alert"} sectioned>
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
          </LegendCard>
        </Layout.Section>

        <Layout.Section variant="quarter">
          <LegendCard sticky sectioned title={"Heading 标题2"}>
            {lorem(100)}
          </LegendCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
