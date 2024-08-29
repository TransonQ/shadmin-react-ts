import type { KnipConfig } from "knip"

const config: KnipConfig = {
  entry: "./src/main.tsx",
  ignore: ["./src/components/ui/**", "./src/api/**"],
}

export default config
