# BasicRadioGroup 单选框组

## 简介

- 解决`ElPlus`的`el-radio`在选中后再次点击无法取消选中
- 使用`value`而非`label`作为组件的改变监听值
- 支持传入数组后渲染所有选项
- 提供灵活的渲染方式，渲染的优先级为：各个选项的`customRender` > 各个选项的`customSlot` > 模板的`render` > 模板的默认插槽 > 普通的`label`渲染

::: note Note
`BasicRadioGroup`选项渲染优先级与`BasicCheckboxGroup`、`BasicSelect`选项渲染优先级一致
:::

## 基本使用

`BasicRadioGroup`支持选中后再次点击取消选中，这在该值非必填时十分有用。另外`v-model`接收的值为value，而非label，这样做基于两点原因：1.大部分情况下传值给后端时值为value而非label，2.`ElPlus`在2.6以上版本也抛弃了label而将value作为绑定值

:::demo
basic-radio-group/basic
:::

## 监听change

很多时候，后端希望您将更多的信息传值给他，如选择产品后，除了产品名称、产品编号、产品分类等传给后端，因此您可以通过监听change事件拿到详细的选中数据

:::demo
basic-radio-group/listen-change
:::

## 请求接口获取选项数组

若选项数据来自后端接口，请传入api，且可传入resultField、labelField、valueField自动构建options

:::demo
basic-radio-group/custom-api
:::

## 格式化各个选项的label

您可以传入`formatter`格式化各个选项的label，`formatter`会map数组里的每个元素后并执行`formatter`函数，得到的结果作为label值进行展示

:::demo
basic-radio-group/custom-formatter
:::

## 自定义单个选项的渲染

您可以使用`customRender`或`customSlot`为各个选项定制渲染

:::demo
basic-radio-group/custom-render
:::

## 统一渲染模板 - render

您可以使用render为所有选项指定统一的渲染模板

:::demo
basic-radio-group/template-render
:::

## 统一渲染模板 - slot

您可以使用默认插槽为所有选项指定统一的渲染模板

:::demo
basic-radio-group/template-slot
:::