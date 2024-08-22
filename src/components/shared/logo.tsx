import { frameVariants } from "@/components"
import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"

const { navbarWidth, navbarCollapsedWidth } = frameVariants
type useLogoProps = { collapsed?: boolean }

export const Logo = ({ collapsed }: useLogoProps = {}) => {
  const [navCollapsed] = useNavCollapse()
  const isCollapsed = collapsed || navCollapsed

  const styles: React.CSSProperties = {
    width: isCollapsed ? navbarCollapsedWidth : navbarWidth,
  }
  return (
    <div
      x-chunk="LOGO"
      style={styles}
      className={cn(
        "shrink-0 h-full text-3xl font-bold p-3 text-nowrap",
        "text-blue-700 flex items-center",
        "transition-all duration-150",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      {isCollapsed ? "S" : "sh-admin"}
    </div>
  )
}
