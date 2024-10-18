# 列表

## why

- 方便展示嵌套层级数据

## 有序列表

您可以指定type为ol进行渲染

:::demo
basic-list/order-list
:::

## 无序列表

您可以指定type为ul进行渲染

:::demo
basic-list/unorder-list
:::

## 格式化各个元素

您可以传入`formatter`格式化各个元素，组件初始化时会map数组里的每个元素后并执行`formatter`函数，得到的结果作为各项的label值进行展示

:::demo
basic-list/list-with-formatter
:::
