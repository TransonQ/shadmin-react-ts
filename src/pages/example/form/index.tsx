import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Layout,
  Page,
  PresetCard,
} from "@/components"
import { ErrorFallback } from "@/components/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorBoundary } from "react-error-boundary"
import { useForm } from "react-hook-form"
import { formSchema } from "./schema"

export const FormExample = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  return (
    <Page title="FormExample" formWith>
      <Layout>
        <Layout.Section>
          <PresetCard sectioned>
            <ErrorBoundary fallbackRender={ErrorFallback.Alert}>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel requiredIndicator>{"Note"}</FormLabel>
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
                <Button
                  onClick={async () => {
                    const valid = await form.trigger()
                    console.log("valid: ", valid)
                  }}
                >
                  {"Submit"}
                </Button>
              </Form>
            </ErrorBoundary>
          </PresetCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
