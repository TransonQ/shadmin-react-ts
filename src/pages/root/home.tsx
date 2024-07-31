import { buttonVariants, Loading } from "@/components"
import { registerRoutes, useDynamicRoutes } from "@/hooks"
import { Link, matchRoutes, Outlet } from "react-router-dom"

export const Home = () => {
  const { dynamicRoutes, isLoading } = useDynamicRoutes()

  return (
    <div x-chunk="APP">
      {isLoading && <Loading />}
      <h1>{"Home"}</h1>
      <div className="flex gap-4">
        <Link to="/" className={buttonVariants({})}>
          {"Home"}
        </Link>
        {!isLoading &&
          matchRoutes(dynamicRoutes, registerRoutes.table.path as string) && (
            <Link to="/app/a" className={buttonVariants({})}>
              {"A"}
            </Link>
          )}
        {!isLoading &&
          matchRoutes(dynamicRoutes, registerRoutes.form.path as string) && (
            <>
              <Link to="/app/b" className={buttonVariants({})}>
                {"B"}
              </Link>
              <Link to="/app/b/123" className={buttonVariants({})}>
                {"B id"}
              </Link>
            </>
          )}
      </div>
      <Outlet />
    </div>
  )
}
