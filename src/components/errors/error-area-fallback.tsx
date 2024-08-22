import type { FallbackProps } from "react-error-boundary"
import { Alert, AlertDescription, AlertTitle } from "../ui"

export const ErrorAreaFallback = ({ error }: FallbackProps) => (
  <Alert variant={"destructive"}>
    <AlertTitle>{"Something went wrong: "}</AlertTitle>
    <AlertDescription className="text-xs text-wrap line-clamp-2">
      {error.message}
    </AlertDescription>
  </Alert>
)
