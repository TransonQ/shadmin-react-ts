import { buttonVariants, Loading } from "@/components"
import { useDynamicRoutes } from "@/hooks"
import { Link, Outlet } from "react-router-dom"

export const Home = () => {
  const { loading } = useDynamicRoutes()

  return (
    <div x-chunk="APP">
      {loading && <Loading />}
      <h1>{"Home"}</h1>
      <div className="flex gap-4">
        <Link to="/" className={buttonVariants({})}>
          {"Home"}
        </Link>
        {!loading && (
          <Link to="/app/a" className={buttonVariants({})}>
            {"A"}
          </Link>
        )}
        {!loading && (
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
