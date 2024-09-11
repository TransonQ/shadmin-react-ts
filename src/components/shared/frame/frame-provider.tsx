/* eslint-disable react-refresh/only-export-components */
import { has } from "lodash-es"
import { createContext, useContext } from "react"
import { frameVariants } from "./constants"
import type { FrameConfig } from "./types"

const FrameConfigContext = createContext<FrameConfig>({
  ...frameVariants,
})

export const useFrameConfig = (): FrameConfig => useContext(FrameConfigContext)

export const FrameProvider = ({
  config,
  children,
}: {
  config: FrameConfig
  children: React.ReactNode
}) => {
  if (has(config, "isNavbarCollapsed") && !config.onNavbarCollapsedChange) {
    console.error(
      `FrameConfig: navbar collapsed but no onNavbarCollapsedChange handler \n
      [FrameProvider 传入了 isNavbarCollapsed 但是没有 onNavbarCollapsedChange]
      `
    )
  }

  return (
    <FrameConfigContext.Provider value={{ ...frameVariants, ...config }}>
      {children}
    </FrameConfigContext.Provider>
  )
}
