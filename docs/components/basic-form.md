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

您可以通过`componentSlots`传递表单项`component`组件所需的插槽

:::warning
若`componentSlots`透传插槽未生效，请参考<链接连转>
:::

:::demo
basic-form/passing-slots
:::

## 表单项隐藏

您可以通过`hidden`设置表单项是否隐藏

:::demo
basic-form/hidden
:::

## 表单项禁用

您可以通过`disabled`设置表单项是否禁用

:::demo
basic-form/disabled
:::

## 文字提示

您可以通过`titleTooltip`设置分组表单标题`title`的提示语，也可以通过`labelTooltip`设置表单项`label`的提示语

:::demo
basic-form/tooltip
:::

## 重置

:::demo
basic-form/reset
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
basic-form/custom-render
:::

## 自定义渲染 - `customSlot`

:::demo
basic-form/custom-slot
:::

## 自定义渲染 - `customLabelRender`

:::demo
basic-form/custom-label-render
:::

## 自定义渲染 - `customLabelSlot`

:::demo
basic-form/custom-label-slot
:::

## 分组表单

:::demo
basic-form/group-form
:::

## 分组表单 - 布局

:::demo
basic-form/group-form-layout
:::

## 分组表单 - 自定义渲染 customTitleRender

:::demo
basic-form/group-form-custom-title-render
:::

## 分组表单 - 自定义渲染 customTitleSlot

:::demo
basic-form/group-form-custom-title-slot
:::

这个要干嘛？

:::demo
basic-form/layout-row
:::
