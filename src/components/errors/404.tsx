import { Text } from "@/components"
import { FileQuestionIcon } from "lucide-react"
import { ErrorContainer } from "./error-container"

export const NotFound404 = () => {
  return (
    <ErrorContainer icon={FileQuestionIcon} title="Page not found">
      <Text as="p" tone="subdued">
        {`Lorem ipsum dolor sit amet consectetur, adipiscing elit odio quisque. 
        Habitant lacinia potenti class interdum dictumst eget condimentum tristique lobortis magna feugiat aenean quis, 
        vulputate eleifend laoreet donec tempor praesent lacus egestas nec vivamus bibendum id.`}
      </Text>
    </ErrorContainer>
  )
}
