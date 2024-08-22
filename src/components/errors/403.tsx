import { FileLock2Icon } from "lucide-react"
import { Text } from "../shared"
import { ErrorContainer } from "./error-container"

export const NoAccess403 = ({ className }: { className?: string }) => {
  return (
    <ErrorContainer
      icon={FileLock2Icon}
      title="Access Denied"
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
