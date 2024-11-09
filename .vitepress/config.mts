import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "comp2511",
  description: "Past papers for COMP2511",
  themeConfig: {
    sidebar: [
      {
        text: "",
        items: [{ text: "Notes", link: "/notes" }],
      },
      {
        text: "Past papers",
        items: [
          { text: "22T2", link: "/past-papers/22T2" },
          { text: "23T2", link: "/past-papers/23T2" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
  },
});
