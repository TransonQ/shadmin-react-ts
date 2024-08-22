import type { FallbackProps } from "react-error-boundary"
import { Alert, AlertDescription, AlertTitle } from "../ui"

const Fallback = ({ error }: FallbackProps) => <span>{error.message}</span>

const ErrorAlert = ({ error }: FallbackProps) => (
  <Alert variant="destructive">
    <AlertTitle>Something went wrong: </AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)

ErrorAlert.displayName = "ErrorFallbackAlert"

export const ErrorFallback = Object.assign(Fallback, { Alert: ErrorAlert })
