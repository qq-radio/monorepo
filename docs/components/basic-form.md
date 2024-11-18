# BasicForm 表单

# 简介

- 通过`schemas`配置渲染一组表单项
- 支持表单联动
- 使用`composables`封装可复用逻辑

# 基本使用

您可以传入`schemas`数组渲染一组表单项，替代手动`v-for`渲染`el-form-item`，并使用`component`字段设置各表单项渲染的组件类型。以下示例列出了目前支持的15种表单项组件类型

:::demo
basic-form/basic
:::

透传组件属性

:::demo
basic-form/passing-props
:::

透传组件插槽

:::demo
basic-form/passing-slots
:::

分组表单

:::demo
basic-form/group-form
:::

分组表单 - 自定义渲染 customTitleRender

:::demo
basic-form/group-form-with-custom-render
:::

分组表单 - 自定义渲染 customTitleSlot

:::demo
basic-form/group-form-with-custom-slot
:::

文字提示

:::demo
basic-form/tooltip
:::

表单重置

:::demo
basic-form/default-value-and-reset
:::

表单项隐藏

:::demo
basic-form/hidden
:::

表单项禁用

:::demo
basic-form/disabled
:::

在schemas中使用form提供的方法

:::demo
basic-form/use-form-methods-with-component-props
:::

在vue中使用form提供的方法

:::demo
basic-form/use-form-methods-with-hook
::: -->

表单布局

默认布局，水平方向`{span: 24}`

:::demo
basic-form/layout-vertical
:::

表单布局

:::demo
basic-form/layout-inline
:::

分组表单布局

:::demo
basic-form/layout-group-form
:::

:::demo
basic-form/layout-row
:::
