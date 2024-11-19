# BasicForm 表单

## 简介

- 通过`schemas`配置渲染一组表单项
- 使用`composables`封装可复用逻辑

## 基本使用

您可以传入`schemas`数组渲染一组表单项，替代手动`v-for`渲染`el-form-item`，并使用`component`字段设置各表单项渲染的组件类型，若未设置`component`则默认为`input`。以下示例列出了已支持的15种表单项组件类型

:::demo
basic-form/basic
:::

## 透传组件属性

您可以通过`componentProps`传递表单项`component`组件所需的属性

:::warning
若`componentProps`透传属性未生效，请参考<链接连转>
:::

:::demo
basic-form/passing-props
:::

## 透传组件插槽

:::demo
basic-form/passing-slots
:::

:::warning
若`componentSlots`透传插槽未生效，请参考<链接连转>
:::

## 表单项隐藏

:::demo
basic-form/hidden
:::

## 表单项禁用

:::demo
basic-form/disabled
:::

## 文字提示

:::demo
basic-form/tooltip
:::

## 重置

:::demo
basic-form/default-value-and-reset
:::

## 表单布局 - 垂直

默认布局，水平方向`{span: 24}`

:::demo
basic-form/layout-vertical
:::

## 表单布局 - 内联

:::demo
basic-form/layout-inline
:::

## 自定义渲染 - `customRender`

:::demo
basic-form/layout-inline
:::

## 自定义渲染 - `customSlot`

:::demo
basic-form/layout-inline
:::

## 自定义渲染 - `customLabelRender`

:::demo
basic-form/layout-inline
:::

## 自定义渲染 - `customLabelSlot`

:::demo
basic-form/layout-inline
:::

## 分组表单

:::demo
basic-form/group-form
:::

## 分组表单 - 布局

:::demo
basic-form/layout-group-form
:::

:::demo
basic-form/layout-row
:::

## 分组表单 - 自定义渲染 customTitleRender

:::demo
basic-form/group-form-with-custom-render
:::

## 分组表单 - 自定义渲染 customTitleSlot

:::demo
basic-form/group-form-with-custom-slot
:::
