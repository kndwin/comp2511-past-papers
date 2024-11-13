import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },

  markdown: {
    config: (md) => {
      md.use(tabsMarkdownPlugin);
    },
    toc: {
      level: [2, 3],
    },
  },
  title: "comp2511",
  description: "Past papers for COMP2511",
  themeConfig: {
    outline: [2, 3],
    sidebar: [
      {
        text: "Notes",
        items: [
          { text: "Code smell", link: "/notes/code-smell" },
          { text: "Design patterns", link: "/notes/patterns" },
          { text: "Principles", link: "/notes/principles" },
        ],
      },
      {
        text: "Past papers",
        items: [
          { text: "21T3", link: "/past-papers/21T3" },
          { text: "22T2", link: "/past-papers/22T2" },
          { text: "23T2", link: "/past-papers/23T2" },
          { text: "24T1", link: "/past-papers/24T1" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
  },
});
