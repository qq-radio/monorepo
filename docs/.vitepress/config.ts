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
        text: "表单",
        link: "/components/basic-form",
      },
      {
        text: "表格",
        link: "/components/basic-table",
      },
      {
        text: "基本",
        items: [
          {
            text: "数据收集",
            items: [
              { text: "输入框", link: "/components/basic-input" },
              { text: "单选", link: "/components/basic-radio" },
              { text: "多选", link: "/components/basic-checkbox" },
              { text: "下拉选择", link: "/components/basic-select" },
            ],
          },
          {
            text: "数据展示",
            items: [
              { text: "渲染", link: "/components/basic-render" },
              { text: "显示", link: "/components/basic-display" },
              { text: "列表", link: "/components/basic-list" },
              { text: "图片", link: "/components/basic-image" },
              { text: "状态", link: "/components/basic-status" },
              { text: "复制", link: "/components/basic-copy" },
            ],
          },
          {
            text: "功能组件",
            items: [
              { text: "弹窗", link: "/components/basic-dialog" },
              { text: "分页器", link: "/components/basic-pagination" },
              { text: "导入", link: "/components/basic-import" },
              { text: "导出", link: "/components/basic-export" },
            ],
          },
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
