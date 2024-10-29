<!-- 基本使用

:::demo
basic-button/button-group-basic
:::
 -->

<!-- dont look back in angle

透传props

您可以通过`buttonProps`传递需要的按钮属性，`buttonProps`会作用于每个按钮，若需要为单独的某个按钮设置特定的属性，单独为其传递`props`即可，`props`优先级高于`buttonProps`

:::demo
basic-button/button-group-passing-props
::: -->
<!--
dont look back in angle

按钮二次确认

若按钮操作需要二次确认，只需传入`onConfirm`即可，二次确认交互方式有2种，分别为`message-box`消息弹出框和`pop-confirm`气泡确认框，默认为`message-box`

:::demo
basic-button/button-group-message-box
:::

若您希望二次确认以气泡确认框展示，`confirmType`传入`pop-confirm`

:::demo
basic-button/button-group-pop-confirm
::: -->

<!-- dont look back in angle

超过隐藏

您可以传入`showNumber`，当超过`showNumber`指定数量时按钮会自动隐藏收起

:::demo
basic-button/button-group-show-number
:::

:::demo
basic-button/button-group-show-number-with-link
::: -->

<!-- dont look back in angle

权限控制

您可以传入`permission`按钮权限控制

:::demo
basic-button/button-group-permission
::: -->

<!-- 回调参数类型

:::demo
basic-button/button-group-callback-params
::: -->
