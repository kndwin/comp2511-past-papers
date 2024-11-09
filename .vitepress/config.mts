import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "comp2511",
  description: "Past papers for COMP2511",
  themeConfig: {
    sidebar: [
      {
        text: "Past papers",
        items: [{ text: "23T2", link: "/past-papers/23T2" }],
      },
    ],
    search: {
      provider: "local",
    },
  },
});
