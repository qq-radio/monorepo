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

## 隐藏

您可以通过`hidden`设置表单项是否隐藏

:::demo
basic-form/hidden
:::

## 禁用

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

当点击重置按钮时，重置各表单项的值为对应的`defaultValue`，需要注意，重置是将表单值恢复为`defaultValue`而非清空

:::demo
basic-form/reset
:::

## 表单布局 - 垂直

表单采用`el-row`和`el-col`结合的栅格布局，您可以通过`rowProps`传递`el-row`自定义属性，可以通过`colProps`传递`el-col`自定义属性。其中表单中的各项采用`el-col`作为`el-form-item`的布局容器，默认各项栅格占据列数为24，当`el-col`默认为`{span: 24}`时便等同于表单默认垂直布局

:::demo
basic-form/layout-vertical
:::

## 表单布局 - 内联

若您希望采用水平布局或内联布局，可全局设置`colProps`或单独设置表单项的`colProps`

:::demo
basic-form/layout-inline
:::

## 自定义渲染 - `customRender`/`tsx`

可以通过`customRender`/`tsx`自定义渲染表单项

:::demo
basic-form/custom-render-tsx
:::

## 自定义渲染 - `customRender`/`h`

可以通过`customRender`/`h`自定义渲染表单项

:::demo
basic-form/custom-render-h
:::

## 自定义渲染 - `customSlot`

可以通过`customSlot`自定义渲染表单项

:::demo
basic-form/custom-slot
:::

## 自定义渲染 - `customLabelRender`/`tsx`

可以通过`customLabelRender`/`tsx`自定义渲染表单项的`label`

:::demo
basic-form/custom-label-render-tsx
:::

## 自定义渲染 - `customLabelRender`/`h`

可以通过`customLabelRender`/`h`自定义渲染表单项的`label`

:::demo
basic-form/custom-label-render-h
:::

## 自定义渲染 - `customLabelSlot`

可以通过`customLabelSlot`自定义渲染表单项的`label`

:::demo
basic-form/custom-label-slot
:::

## 分组表单

若您希望实现分组表单，`schemas`数组里配置项字段设置为`title`即可，且可通过`titleProps`传递自定义属性

:::warning
分组表单其实可以直接当做一个含有特殊样式的文本类型表单项，因此它在实际应用上可能会有局限性。若无法完全满足您的要求，更建议您手动实现分组表单，在外部多次调用`BasicForm`的方法实现
:::

:::demo
basic-form/group-form
:::

## 分组表单 - 布局

分组表单与`el-form-item`一样，采用`el-col`作为布局容器，默认栅格占据列数为24。若您希望自定义分组表单布局，可全局设置`titleColProps`或单独设置配置项的`titleColProps`

:::demo
basic-form/group-form-layout
:::

## 分组表单 - 自定义渲染 - `customTitleRender`/`tsx`

:::demo
basic-form/group-form-custom-title-render-tsx
:::

## 分组表单 - 自定义渲染 - `customTitleRender`/`h`

:::demo
basic-form/group-form-custom-title-render-h
:::

## 分组表单 - 自定义渲染 - `customTitleSlot`

:::demo
basic-form/group-form-custom-title-slot
:::

## 表单联动

:::demo
basic-form/use-form-methods-with-hook
:::
