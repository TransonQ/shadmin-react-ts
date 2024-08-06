import { popper } from "@/components"
import { LoaderFunctionArgs, redirect } from "react-router-dom"

export const loaderRoot = async (props: LoaderFunctionArgs) => {
  console.log("root loader")
  await new Promise((resolve) => setTimeout(resolve, 2000))
  popper.success("Authenticated Welcome")

  return redirect("/app")
}
