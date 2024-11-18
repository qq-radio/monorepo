:::info
由于性能原因，`componentProps`不进行类型强校验，只要`componentProps`为正确的`object`对象，则直接通过`v-bind='item.componentProps'`将属性绑定给对应的`component`组件，若属性已在`componentProps`中定义，但`component`仍未生效，可根据以下步骤进行排查：1.如果`component`使用的组件为
:::

`BasicForm`除了让您可以通过传入`schemas`数组后快速渲染一组表单项，还希望您能尽可能少写重复性代码，将注意力更集中在业务逻辑上。因此组件内部还进行了以下默认处理：

- `component`若未设置，则默认为`input`
- 普通的`placeholder`无需传递，组件内部根据`label`与`component`自动推导出来
- 若表单项已设置`required: true`，组件内部自动生成必填的rule对象
- 为所有表单项添加`clearable: true`
- 若为日期选择器，则自动设置
