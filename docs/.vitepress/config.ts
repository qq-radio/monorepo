import { defineConfig } from "vitepress";
import { mdPlugin } from "./plugins/mdPlugin";

export default defineConfig({
  base: "/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "组件", link: "/guide/component-overview" },
    ],
    sidebar: [
      {
        text: "简介",
        items: [
          { text: "设计总则", link: "/guide/design-principle" },
          { text: "组件总览", link: "/guide/component-overview" },
        ],
      },
      {
        text: "高级",
        items: [
          {
            text: "表单",
            link: "/components/basic-form",
          },
          {
            text: "表格",
            link: "/components/basic-table",
          },
        ],
      },
      {
        text: "内置",
        items: [
          {
            text: "数据收集",
            items: [
              { text: "输入框", link: "/components/basic-input" },
              { text: "单选", link: "/components/basic-radio-group" },
              { text: "多选", link: "/components/basic-checkbox-group" },
              { text: "下拉选择", link: "/components/basic-select" },
              { text: "树选择", link: "/components/basic-tree-select" },
              { text: "级联选择", link: "/components/basic-cascader" },
            ],
          },
          {
            text: "数据展示",
            items: [
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
              {
                text: "弹窗",
                items: [
                  { text: "基本", link: "/components/basic-dialog" },
                  {
                    text: "组合式函数",
                    link: "/components/basic-dialog-composable",
                  },
                ],
              },
              { text: "分页器", link: "/components/basic-pagination" },
              { text: "按钮组", link: "/components/basic-button-group" },
              { text: "导入", link: "/components/basic-import" },
              { text: "导出", link: "/components/basic-export" },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/qq-radio/monorepo" },
    ],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
});
