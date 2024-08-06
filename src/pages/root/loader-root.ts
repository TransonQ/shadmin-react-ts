import { popper } from "@/components"
import { LoaderFunctionArgs, redirect } from "react-router-dom"

export const loaderRoot = async (props: LoaderFunctionArgs) => {
  // mock checking login
  await new Promise((resolve) => setTimeout(resolve, 1000))
  popper.success("Login successfully, welcome!")

  return redirect("/app")
}
