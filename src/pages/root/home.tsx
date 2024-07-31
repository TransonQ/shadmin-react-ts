import { buttonVariants, Loading } from "@/components"
import { useDynamicRoutes } from "@/hooks"
import { Link, matchRoutes, Outlet } from "react-router-dom"

const navs = [
  {
    path: "/app/a",
    content: "App - Bills",
    requiredAccess: false,
  },
  {
    path: "/app/b",
    content: "update-bill",
    requiredAccess: true,
  },
]

export const Home = () => {
  const { dynamicRoutes, isLoading } = useDynamicRoutes()

  const dynamicNavs = navs.filter((nav) => {
    if (nav.requiredAccess) {
      return !!matchRoutes(dynamicRoutes, nav.path)
    } else {
      return true
    }
  })

  return (
    <div x-chunk="APP">
      {isLoading && <Loading />}
      <h1>{"Home"}</h1>
      <div className="flex gap-4">
        <Link to="/" className={buttonVariants({})}>
          {"Home"}
        </Link>
      </div>
      <div className="mt-4 flex gap-4">
        {dynamicNavs.map(({ path, content }) => (
          <Link key={path} to={path} className={buttonVariants({})}>
            {content}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
