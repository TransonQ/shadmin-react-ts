import { LoaderFunctionArgs, redirect } from "react-router-dom"

export const loaderRoot = async (props: LoaderFunctionArgs) => {
  console.log("root loader")
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return redirect("/app")
}
