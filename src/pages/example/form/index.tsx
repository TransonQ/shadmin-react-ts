import { ErrorFallback } from "@/components/errors"
import {
  BlockStack,
  ContextualSaveBar,
  FormLayout,
  FormLayoutGroup,
  LegendCard,
  LegendSelect,
  Page,
  Show,
} from "@/components/shared"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { generateDate } from "@/lib"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "lodash-es"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useForm } from "react-hook-form"
import { formSchema } from "./schema"

export const FormExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      accountName: "",
      accountAddress: "",
      description: "",
      amount: "100",
      currency: "CNY",
      date: generateDate(0).dateISOString[0],
      note: "",
    },
  })
  const formValues = form.getValues()
  const formErrors = form.formState.errors
  console.log("formErrors: ", formErrors)

  const [selectMultiple, setSelectMultiple] = useState<string[]>([])
  const [selectSingle, setSelectSingle] = useState<string>("")

  useEffect(() => {
    console.log("formValues: ", formValues)
    console.log(selectMultiple)
  }, [selectMultiple, formValues])

  return (
    <Page title="FormExample" formWith>
      <ErrorBoundary fallbackRender={ErrorFallback.Alert}>
        <Form {...form}>
          <BlockStack gap="lg">
            <Show when={!isEmpty(formErrors)} fallback={null}>
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4 mr-2" />
                <AlertTitle>{"Validation error"}</AlertTitle>
                {Object.values(formErrors).map((error) => (
                  <AlertDescription key={error.message}>
                    {error.message}
                  </AlertDescription>
                ))}
              </Alert>
            </Show>
            <LegendCard sectioned>
              <FormLayout>
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel requiredIndicator>{"Account Name"}</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Account Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountAddress"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Account Address"}</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Account Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Description"}</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          autoComplete="off"
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormLayout>
            </LegendCard>

            <LegendCard sectioned>
              <FormLayout>
                <FormLayoutGroup>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel requiredIndicator>{"Amount"}</FormLabel>
                        <FormControl>
                          <Input autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel requiredIndicator>{"Currency"}</FormLabel>
                        <FormControl>
                          <LegendSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={["CNY", "USD", "EUR", "GBP", "JPY"].map(
                              (s) => ({ label: s, value: s })
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormLayoutGroup>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Date"}</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          {...field}
                          placeholder="2024-10-01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Note"}</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LegendSelect
                  title="Preset Select Single (Default)"
                  showSearch
                  requiredIndicator
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  value={selectSingle}
                  onChange={setSelectSingle}
                />

                <LegendSelect
                  multiple
                  title="Preset Select Multiple"
                  showSearch
                  requiredIndicator
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  value={selectMultiple}
                  onChange={setSelectMultiple}
                />
              </FormLayout>
            </LegendCard>
          </BlockStack>
        </Form>
      </ErrorBoundary>

      <ContextualSaveBar
        pageWidth="formWidth"
        discardAction={{
          onAction: () => {
            form.reset()
          },
        }}
        saveAction={{
          onAction: async () => {
            await form.trigger()
          },
        }}
      />
    </Page>
  )
}
