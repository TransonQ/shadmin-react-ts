import { SirenIcon } from "lucide-react"
import { useRouteError } from "react-router-dom"
import { Show } from "../shared"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui"
import { ErrorContainer } from "./error-container"

export const RouteError = () => {
  const error: any = useRouteError()

  return (
    <ErrorContainer icon={SirenIcon} title="Something went wrong">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="error" className="border-b-0">
          <AccordionTrigger>
            <div className="line-clamp-5">
              <span>{error?.name}:</span> {error?.message}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="line-clamp-8">
              <Show when={error?.stack}>{error.stack}</Show>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ErrorContainer>
  )
}
