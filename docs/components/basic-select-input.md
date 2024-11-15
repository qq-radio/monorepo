# BasicSelectInput 输入框

## 基本使用

当`input`用于点击后打开表格弹窗选择数据后回填至输入框，此时`input`不用做输入，因此需要设为`readonly`，但当设为`readonly`时，`input`的`clearable`会失效，导致凡是输入框有值后无法删除，这在该项不是必填的情况下会导致选择后无法清空的情况，因此开发该组件，在`el-input`设为`readonly`基础上添加清空按钮

## 基本使用

:::demo
basic-select-input/basic
:::

## 禁用

禁用时自动隐藏`search`和`clear`图标
:::demo
basic-select-input/disabled
:::
