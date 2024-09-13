import type { PageWidth } from "@/components/lib"
import {
  BlockStack,
  ContextualSaveBar,
  DatePicker,
  FormLayout,
  FormLayoutGroup,
  Icon,
  InlineStack,
  Layout,
  LayoutSection,
  LegendCard,
  LegendSelect,
  Modal,
  ModalSection,
  NavigationBlocker,
  Page,
  shadmin,
  StatusDot,
} from "@/components/shared"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from "@/components/ui"
import { useToast } from "@/components/ui/use-toast"
import { useObjectState } from "@/hooks"
import { sleep } from "@/lib"
import { lorem } from "@/mocks/mock-data"
import { useAtom } from "jotai/react"
import { atomWithRefresh } from "jotai/utils"
import { AlertCircleIcon, ArrowRightIcon, StarIcon } from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"

const asyncAtom = atomWithRefresh(() =>
  sleep(3000, { name: "Async Atom State" })
)

function TestAsync() {
  const [asyncState, refresh] = useAtom(asyncAtom)
  return (
    <LegendCard sectioned>
      <p>{asyncState.name}</p>
      <Button size={"sm"} variant={"ghost"} onClick={() => refresh()}>
        {"Refresh atom"}
      </Button>
    </LegendCard>
  )
}

export const Home = () => {
  const navigate = useNavigate()
  const [isSavebarActive, setIsSavebarActive] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [pageWidth, setPageWidth] = useState<PageWidth>("defaultWidth")
  const { toast } = useToast()
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined)
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>(
    undefined
  )
  const [objectState, setObjectState] = useObjectState({
    name: "",
    address: "",
    isModalOpen: false,
  })

  useEffect(() => {
    console.log("objectState", objectState)
  }, [objectState])

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
          content: "shadmin.toast.success",
          icon: <Icon source={StarIcon} />,
          onAction() {
            shadmin.toast.success("Secondary Action 1")
          },
        },
        {
          content: "shadcn use-toast",
          onAction: async () => {
            toast({
              title: "Secondary Action 2",
              // variant: "destructive",
              description: "This action cannot be undone",
            })
            console.log(123)
          },
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
        <LayoutSection>
          <BlockStack gap="lg" inlineAlign="stretch">
            <Suspense fallback={<p>Loading...</p>}>
              <TestAsync />
            </Suspense>
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
            <LegendCard title="useObjectState" sectioned>
              <FormLayout>
                <FormLayoutGroup>
                  <Input
                    placeholder="{name: input }"
                    value={objectState.name}
                    onChange={(e) => setObjectState({ name: e.target.value })}
                  />
                  <Input
                    placeholder="{address: input }"
                    value={objectState.address}
                    onChange={(e) =>
                      setObjectState((state) => {
                        state.address = e.target.value
                        return state
                      })
                    }
                  />
                </FormLayoutGroup>
              </FormLayout>
            </LegendCard>
            <LegendCard title={"Date Picker"} sectioned>
              <FormLayout>
                <FormLayoutGroup>
                  <Label>
                    <span className="inline-block pb-2">{"Date Picker"}</span>
                    <DatePicker value={dateValue} onChange={setDateValue} />
                  </Label>
                  <Label>
                    <span className="inline-block pb-2">
                      {"Date Range Picker"}
                    </span>
                    <DatePicker
                      isRangeMode
                      value={dateRangeValue}
                      onChange={setDateRangeValue}
                    />
                  </Label>
                </FormLayoutGroup>
              </FormLayout>
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
        </LayoutSection>

        <LayoutSection variant="quarter">
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
        </LayoutSection>
      </Layout>

      <Layout>
        <LayoutSection>
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
        </LayoutSection>

        <LayoutSection variant="quarter">
          <LegendCard sticky sectioned title={"Modal"}>
            <Button onClick={() => setObjectState({ isModalOpen: true })}>
              open modal
            </Button>
          </LegendCard>
        </LayoutSection>
      </Layout>
      <Modal
        title="Confirm Leave"
        open={objectState.isModalOpen}
        onClose={() => setObjectState({ isModalOpen: false })}
        primaryAction={{
          content: "Primary",
          onAction: () => {
            setObjectState({ isModalOpen: false })
          },
        }}
        secondaryAction={{
          content: "Secondary",
          onAction: () => {
            setObjectState({ isModalOpen: false })
          },
        }}
      >
        <ModalSection>123</ModalSection>
      </Modal>
    </Page>
  )
}
