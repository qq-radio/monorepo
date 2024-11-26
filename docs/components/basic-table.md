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

您可以通过`searchConfig`设置表格的搜索项

:::demo
basic-table/search
:::

## 搜索 - 透传属性与插槽

表格的搜索采用`BasicForm`渲染，每一项搜索配置`searchConfig`相当于`BasicForm`里的一个表单项`FormItem`。您可以通过`searchProps`透传`BasicForm`属性，以及通过`searchConfig`透传每一个表单项`FormItem`属性

:::demo
basic-table/search-passing-props-slots
:::

## 搜索 - 自动构建搜索配置

您可以在`searchConfig`里配置搜索表单项的完整属性，若有以下情况也可省略部分配置

- 若搜索项的`label`、`prop`与表格里的`label`、`prop`一致，可直接省略
- 若搜索项的`label`、`prop`与表格里的`label`、`prop`一致，且`component=input`，则可以直接使用`searchable: true`替代`searchConfig`配置

:::demo
basic-table/search-searchable
:::

## 搜索 - 自定义搜索配置

`BasicTable`更推荐您在表格列配置里添加`searchConfig`当做表单的搜索配置，原因：

- 使数据、业务逻辑更加集中
- 当字段名称一致，可以省略部分配置

当然，若有特殊情况，您也可以自定义`searchSchemas`，当配置`searchSchemas`时，表格列里的每一项`searchConfig`则不生效

:::demo
basic-table/search-schemas
:::

## 显示或隐藏

您可以通过`visible`控制列的显示或隐藏

:::demo
basic-table/visible
:::

## 文字提示

您可以通过`headerTooltip`设置列的表头提示语

:::demo
basic-table/tooltip
:::

## 操作栏按钮组

您可以通过配置`operations`渲染表格操作栏按钮组，并通过`operationProps`传入按钮组自定义属性

:::note
操作栏按钮组`operations`与操作列按钮组`actions`均采用`BasicButtonGroup`渲染，更多用法请参考[BasicButtonGroup](/components/basic-button-group)
:::

:::demo
basic-table/operations
:::

## 操作列按钮组

您可以通过配置`actions`渲染表格操作列按钮组，并通过`actionProps`传入按钮组自定义属性，且可通过`actionColumnProps`传入操作列的自定义属性

:::note
操作列按钮组`actions`与操作栏按钮组`operations`均采用`BasicButtonGroup`渲染，更多用法请参考[BasicButtonGroup](/components/basic-button-group)
:::

:::demo
basic-table/actions
:::

## 格式化数据

您可以传入`formatter`格式化单元格数据，`formatter`的属性名称与`el-table`的`formatter`属性名称保持一致，但是函数的回调参数区别如下：

- `el-table`的回调参数为`(row: any, column: any, cellValue: any, index: number)`
- `BasicTable`的回调参数为`(params:{ row: any, column: any, value: any, rowIndex: number, schema: TableSchema})`

重写回调参数的目的有3点：

- 注入当前列配置`schema`
- 用对象解构替换数组解构，避免数组解构时存在未使用的变量
- 使用更具语义化的变量名称

:::demo
basic-table/formatter
:::

## 自定义渲染列 - `customRender`/`tsx`

您可以通过`customRender`/`tsx`自定义渲染列

:::demo
basic-table/custom-render-tsx
:::

## 自定义渲染列 - `customRender`/`h`

您可以通过`customRender`/`h`自定义渲染列

:::demo
basic-table/custom-render-h
:::

## 自定义渲染列 - `customSlot`

您可以通过`customSlot`自定义渲染列

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

您可以通过`customHeaderRender`/`tsx`自定义渲染列

:::demo
basic-table/custom-header-tsx
:::

## 自定义渲染表头 - `customHeaderRender`/`h`

您可以通过`customHeaderRender`/`h`自定义渲染列

:::demo
basic-table/custom-header-h
:::

## 自定义渲染表头 - `customHeaderSlot`

您可以通过`customHeaderSlot`自定义渲染列

:::demo
basic-table/custom-header-slot
:::

## 序号

若需要展示序号列，仅需传入`hasIndex`，且可通过`indexColumnProps`自定义序号列属性

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
