# BasicTable 表格

## 简介

- 通过`schemas`配置渲染表格
- 使用`composables`封装可复用逻辑

:::danger
为了方便数据的统一维护，该页面的所有表格数据均来自`docs/mocks/user-list.json`文件，因此当您复制代码时，需同`user-list.json`文件一起复制，才能保证demo的正常运行
:::

:::note
该页面的demo采用`props`传参的写法，若您更喜欢`composables`写法，请查看下一章节[组合式函数](/components/basic-table-composable)
:::

## 基本使用

您可以传入`schemas`数组快速渲染表格，以下是最常见的表格使用示例

:::demo
basic-table/basic
:::

## 搜索

:::demo
basic-table/search
:::

## 隐藏

:::demo
basic-table/visible
:::

## 文字提示

:::demo
basic-table/tooltip
:::

## 操作栏

:::demo
basic-table/operations
:::

## 操作列

:::demo
basic-table/actions
:::

## 格式化数据

您可以传入`formatter`格式化单元格数据，请注意`formatter`也是`ElPlus`的table组件提供的属性，但原`formatter`的回调参数为`(row: any, column: any, cellValue: any, index: number)`，
这不是一个好的函数传参形式，参数多于2个的情况下，应将函数参数定义为一个对象，使用时使用解构得到想要的参数，因此`formatter`在`BasicTable`里被重写了，以下为对比
原`formatter`的回调参数为`(row: any, column: any, cellValue: any, index: number)`
`BasicTable`的回调参数为`( params : { row: any, column: any, value: any, rowIndex: number ,   schema: TableSchema ,})`
`formatter`函数的执行结果除了作为单元格数据的渲染内容外，若您传入了`display`，也会作为`display`对应组件的value值传入组件内部，例如下例中的状态栏
:::demo
basic-table/formatter
:::

## 自定义渲染列 - `customRender`/`tsx`

:::demo
basic-table/custom-render-tsx
:::

## 自定义渲染列 - `customRender`/`h`

:::demo
basic-table/custom-render-h
:::

## 自定义渲染列 - `customSlot`

:::demo
basic-table/custom-slot
:::

## 自定义渲染列 - `display`

您可以指定`display`类型来自定义渲染列

:::note
更多的`display`用法请参考[BasicDisplay](/components/basic-display)
:::

:::demo
basic-table/custom-display
:::

## 自定义渲染表头 - `customHeaderRender`/`tsx`

:::demo
basic-table/custom-header-tsx
:::

## 自定义渲染表头 - `customHeaderRender`/`h`

也没有很难啊 现在header只剩下h了

:::demo
basic-table/custom-header-h
:::

## 自定义渲染表头 - `customHeaderSlot`

:::demo
basic-table/custom-header-slot
:::

## 序号

若需要展示序号列，仅需传入`hasIndex`，若需要设置序号列属性，传入`indexColumnProps`，序号列默认属性为`label: "序号"`和`width: "60"`

:::demo
basic-table/index
:::

## 展开

:::demo
basic-table/expand
:::

## 单选

若需要使用表格数据单选功能，仅需传入`hasRadioSelection`，若需要设置单选列属性，传入`radioSelectionColumnProps`，单选列默认的属性为`align: "center"`和`width: 50`。

使用单选时，需要指定唯一的`rowKey`，默认为`id`

您可以搭配`BasicTable`提供的单选hook（详见），也可以直接在`BasicTable`上监听

:::demo
basic-table/radio-selection
:::

这个我认为有问题 之后要重写 主要是usetableselection这个hook有问题 表格数据多选

若需要使用表格数据多选功能，仅需传入`hasSelection`，若需要设置多选列属性，传入`selectionColumnProps`，多选列默认的属性为`align: "center"`和`width: 50`。

## 多选

使用多选时，需要指定唯一的`rowKey`，默认为`id`

您可以搭配`BasicTable`提供的多选hook（详见），也可以直接在`BasicTable`上监听

:::demo
basic-table/selection
:::
