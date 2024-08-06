import { Text } from "@/components"
import { FileQuestionIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ErrorContainer } from "./error-container"

export const NotFound404 = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  return (
    <ErrorContainer
      icon={FileQuestionIcon}
      title="Page not found"
      className={className}
      primaryAction={{
        content: "Go Home",
        onAction: () => {
          navigate("/", { replace: true })
        },
      }}
    >
      <Text as="p" tone="subdued">
        {`Lorem ipsum dolor sit amet consectetur, adipiscing elit odio quisque. 
        Habitant lacinia potenti class interdum dictumst eget condimentum tristique lobortis magna feugiat aenean quis, 
        vulputate eleifend laoreet donec tempor praesent lacus egestas nec vivamus bibendum id.`}
      </Text>
    </ErrorContainer>
  )
}
