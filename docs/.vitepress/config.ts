import { defineConfig } from "vitepress";
import { mdPlugin } from "./plugins/mdPlugin";

export default defineConfig({
  title: "Schema Driven Development",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Examples??",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Overview", link: "/overview" },
        ],
      },
      {
        text: "schema组件",
        items: [
          { text: "表单", link: "/advance-components/basic-form" },
          { text: "表格", link: "/advance-components/basic-table" },
        ],
      },
      {
        text: "基本",
        link: "/basic-components/test",
        items: [
          {
            text: "数据收集",
            link: "/basic-components/data-collect",
            items: [
              { text: "输入框", link: "/basic-components/basic-input" },
              { text: "单选", link: "/basic-components/basic-radio" },
              { text: "多选", link: "/basic-components/basic-checkbox" },
              { text: "下拉选择", link: "/basic-components/basic-input" },
            ],
          },
          // {
          //   text: "数据展示",
          //   link: "/basic-components/data-display",
          //   items: [
          //     { text: "渲染", link: "/basic-components/basic-render" },
          //     { text: "显示", link: "/basic-components/basic-display" },
          //     { text: "列表", link: "/basic-components/basic-list" },
          //     { text: "图片", link: "/basic-components/basic-image" },
          //     { text: "状态", link: "/basic-components/basic-status" },
          //     { text: "复制", link: "/basic-components/basic-copy" },
          //   ],
          // },
          // {
          //   text: "功能组件",
          //   link: "/basic-components/data-collect",
          //   items: [
          //     { text: "弹窗", link: "/basic-components/basic-dialog" },
          //     { text: "分页器", link: "/basic-components/basic-pagination" },
          //     { text: "导入", link: "/basic-components/basic-import" },
          //     { text: "导出", link: "/basic-components/basic-export" },
          //   ],
          // },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
});
