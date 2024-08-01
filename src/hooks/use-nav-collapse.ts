import { atom, useAtom } from "jotai"

const AtomNavCollapsed = atom(false)

export const useNavCollapse = () => {
  return useAtom(AtomNavCollapsed)
}
