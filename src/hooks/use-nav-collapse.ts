import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const AtomNavCollapsed = atomWithStorage("keep_navbar_collapsed", false)

export const useNavCollapse = () => {
  return useAtom(AtomNavCollapsed)
}
