## why

- 根据提供的`api`接口自动获取数据
- 改写`change`事件，回调参数为`value`，和value对应的`node`值

## 基本使用

您可以直接传入`api`接口来自动获取数据，其余的el-cascader传值仍与之前保持一致

:::demo
basic-cascader/basic
:::

## 监听change

若您需要更详细的选中值信息，可直接监听`change`事件，`BasicCascader`的`change`事件与`el-cascader`的`change`事件不同在于，除了暴露了`value`值，还有`value`对应的`node`值

:::demo
basic-cascader/listen-change
:::
