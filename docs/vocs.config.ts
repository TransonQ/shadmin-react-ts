import { defineConfig } from "vocs"

export default defineConfig({
  title: "shadmin",
  sidebar: [
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "Libs",
      collapsed: true,
      items: [],
    },
    {
      text: "Base",
      collapsed: false,
      items: [
        { text: "Show", link: "/base/show" },
        { text: "BlockStack", link: "/base/block-stack" },
      ],
    },
    {
      text: "Hooks",
      collapsed: true,
      items: [],
    },
  ],
})
