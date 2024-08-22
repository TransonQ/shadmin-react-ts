import {
  BlockStack,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLayout,
  FormMessage,
  InlineStack,
  Input,
  Page,
  PresetCard,
  PresetSelect,
} from "@/components"
import { ErrorFallback } from "@/components/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useForm } from "react-hook-form"
import { formSchema } from "./schema"

export const FormExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const formValues = form.getValues()

  const [select, setSelect] = useState("3")
  useEffect(() => {
    console.log(select)
  }, [select])

  return (
    <Page title="FormExample" formWith>
      <ErrorBoundary fallbackRender={ErrorFallback.Alert}>
        <Form {...form}>
          <BlockStack gap="lg">
            <PresetCard sectioned>
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
                          placeholder="Note"
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
            </PresetCard>

            <PresetCard sectioned>
              <FormLayout>
                <FormLayout.Group>
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
                        <FormLabel>{"Currency"}</FormLabel>
                        <FormControl>
                          <Input autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormLayout.Group>

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

                <PresetSelect
                  title="Preset Select"
                  showSearch
                  requiredIndicator
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  value={select}
                  onChange={setSelect}
                />
              </FormLayout>
            </PresetCard>

            <InlineStack align="end">
              <Button
                onClick={async () => {
                  const valid = await form.trigger()
                  console.log("valid: ", valid)
                }}
              >
                {"Submit"}
              </Button>
            </InlineStack>
          </BlockStack>
        </Form>
      </ErrorBoundary>
    </Page>
  )
}
