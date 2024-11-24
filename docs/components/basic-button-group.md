# BasicButtonGroup 按钮组

## 基本使用

您可以传入数组渲染一组按钮，按钮组采用`el-button`循环渲染，且默认属性为`type=primary`

:::demo
basic-button-group/basic
:::

## 透传属性

您可以通过`buttonProps`传递希望自定义的按钮属性，`buttonProps`会作用于每个按钮。若需要单独为某个按钮设置特定的属性，单独为其传递`props`即可，`props`优先级高于`buttonProps`

:::demo
basic-button-group/passing-props
:::

## 按钮二次确认

若按钮操作需要二次确认，只需传入`onConfirm`即可，二次确认交互方式有2种，分别为消息弹出框`message-box`和气泡确认框`pop-confirm`，默认为`message-box`

:::demo
basic-button-group/message-box
:::

若您希望二次确认以气泡确认框展示，`confirmType`传入`pop-confirm`

:::demo
basic-button-group/pop-confirm
:::

## 超过时隐藏

若您希望按钮超过一定数量时隐藏，可传入`showNumber`。按钮数量超过`showNumber`时自动隐藏，点击`更多`可展示全部按钮

:::demo
basic-button-group/show-number
:::

:::demo
basic-button-group/show-number-with-link
:::

## 禁用

:::demo
basic-button-group/disabled
:::

## 权限控制

您可以传入`permission`进行按钮权限控制

:::demo
basic-button-group/permission
:::

## 特殊`type`

`BasicButtonGroup`内置了导入和导出按钮，您只需设置`type=import`、`type=export`，并传入相应的配置即可

:::demo
basic-button-group/type
:::

## 回调参数类型

:::demo
basic-button-group/callback-params
:::
