import {
  Button,
  FormControl,
  FormDescription,
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
import { Form, useForm } from "react-hook-form"
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
            <Form {...form}>
              <ErrorBoundary fallbackRender={ErrorFallback.Alert}>
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Account Name"}</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" />
                      </FormControl>
                      <FormDescription>
                        {"This is your public display name."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ErrorBoundary>
              <Button type="submit">{"Submit"}</Button>
            </Form>
          </PresetCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
