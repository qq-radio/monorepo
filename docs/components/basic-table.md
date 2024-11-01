<!-- 基本使用

:::demo
basic-table/basic
::: -->

<!-- 操作栏和操作列

:::demo
basic-table/operations-with-actions
::: -->

<!-- 表格数据单选

若需要使用表格数据单选功能，仅需传入`hasRadioSelection`，若需要设置单选列属性，传入`radioSelectionColumnProps`，单选列默认的属性为`align: "center"`和`width: 50`。

使用单选时，需要指定唯一的`rowKey`，默认为`id`

您可以搭配`BasicTable`提供的单选hook（详见），也可以直接在`BasicTable`上监听

:::demo
basic-table/radio-selection
::: -->

<!-- 这个我认为有问题 之后要重写 主要是usetableselection这个hook有问题 表格数据多选

若需要使用表格数据多选功能，仅需传入`hasSelection`，若需要设置多选列属性，传入`selectionColumnProps`，多选列默认的属性为`align: "center"`和`width: 50`。

使用多选时，需要指定唯一的`rowKey`，默认为`id`

您可以搭配`BasicTable`提供的多选hook（详见），也可以直接在`BasicTable`上监听

:::demo
basic-table/selection
::: -->

<!-- 序号

若需要展示序号列，仅需传入`hasIndex`，若需要设置序号列属性，传入`indexColumnProps`，序号列默认属性为`label: "序号"`和`width: "60"`

:::demo
basic-table/index
::: -->

<!-- 展开，与expand插槽

:::demo
basic-table/expand
::: -->

自定义表头 - render/h

也没有很难啊 现在header只剩下h了

:::demo
basic-table/custom-header-h
:::

<!-- 自定义表头 - render/jsx

:::demo
basic-table/custom-header-jsx
::: -->

<!--
自定义表头 - render/slot

:::demo
basic-table/custom-header-slot
::: -->

<!--
自定义列模板 - render/h

:::demo
basic-table/custom-column-h
::: -->

<!-- 自定义列模板 - render/jsx

:::demo
basic-table/custom-column-jsx
::: -->

<!-- 自定义列模板 - slot

:::demo
basic-table/custom-column-slot
::: -->

<!-- 自定义列模板 - display type

:::demo
basic-table/custom-column-display
::: -->
<!--
格式化数据 - formatter

您可以传入`formatter`格式化单元格数据，请注意`formatter`也是`ElPlus`的table组件提供的属性，但原`formatter`的回调参数为`(row: any, column: any, cellValue: any, index: number)`，
这不是一个好的函数传参形式，参数多于2个的情况下，应将函数参数定义为一个对象，使用时使用解构得到想要的参数，因此`formatter`在`BasicTable`里被重写了，以下为对比
原`formatter`的回调参数为`(row: any, column: any, cellValue: any, index: number)`
`BasicTable`的回调参数为`( params : { row: any, column: any, value: any, rowIndex: number ,   schema: TableSchema ,})`
`formatter`函数的执行结果除了作为单元格数据的渲染内容外，若您传入了`display`，也会作为`display`对应组件的value值传入组件内部，例如下例中的状态栏
:::demo
basic-table/formatter
::: -->
<!--
表头提示语 - headerTooltip

:::demo
basic-table/header-tooltip
::: -->

<!-- 使用hook - useTableData

:::demo
basic-table/use-table-data
::: -->

<!-- 使用hook - useTableSelection

:::demo
basic-table/use-table-selection
::: -->

<!-- 使用hook - useTableRadioSelection

:::demo
basic-table/use-table-radio-selection
::: -->

<!-- 使用hook - page

:::demo
basic-table/map-page-field
::: -->
<!--
搜索的布局，与省略

:::demo
basic-table/search
::: -->

<!-- 搜索的布局 inline-search-button

:::demo
basic-table/search
::: -->
