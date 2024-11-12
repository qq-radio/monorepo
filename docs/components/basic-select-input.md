# 输入框

## 只读输入框

### 简介

当input用于点击后打开表格弹窗选择数据后回填至输入框，此时input不用做输入，因此需要设为readonly，而readonly时，input的clearable会失效，会导致凡是输入框有值后无法删除，这在该项不是必填的情况下会导致交互无法满足需求，因此开发该组件，在input readonly的前提下，添加清空按钮

### 基本使用

:::demo
basic-select-input/readonly-input-with-clear
:::

### 禁用

禁用时自动隐藏search和clear图标
:::demo
basic-select-input/readonly-input-disabled
:::
