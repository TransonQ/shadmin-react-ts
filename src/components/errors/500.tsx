import { ServerOffIcon } from "lucide-react"
import { Text } from "../shared"
import { ErrorContainer } from "./error-container"

export const SeverError500 = ({ className }: { className?: string }) => {
  return (
    <ErrorContainer
      icon={ServerOffIcon}
      title="Server Error"
      className={className}
    >
      <Text as="p" tone="subdued">
        {`Lorem ipsum dolor sit amet consectetur, adipiscing elit odio quisque. 
        Habitant lacinia potenti class interdum dictumst eget condimentum tristique lobortis magna feugiat aenean quis, 
        vulputate eleifend laoreet donec tempor praesent lacus egestas nec vivamus bibendum id.`}
      </Text>
    </ErrorContainer>
  )
}
