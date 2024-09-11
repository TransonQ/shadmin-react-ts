export interface FrameConfig {
  /** FrameLogo */
  logo?: React.ReactNode
  /** FrameHeader */
  headerHeight?: number 
  /** FrameNavbar */
  isNavbarCollapsed?: boolean
  onNavbarCollapsedChange?: (collapsed: boolean) => void
  navbarWidth?: number
  navbarCollapsedWidth?: number 
  /** Frame zIndex */
  zIndex?: number
}
