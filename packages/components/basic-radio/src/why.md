为什么一定需要它？

1.EPlus radio 有3种用法，radio radio-group radio-button，而如果使用 BasicRadioGroup 的话，这3种都支持，若想使用 radio-button 只需要传 props button="true"即可

2.EPlus 的radio在选中后无法取消选中，而 BasicRadioGroup 支持选中后再点击取消选中

3.BasicRadioGroup 可以直接传入options，组件内部自动循环渲染各个radio

4.radio选项可以通过options传入，也可以传入一个api，api返回的结果作为options的选项

5.抛弃 use label as value 因为element在2.6以后也抛弃了，所以类型定义里label value在此时都是必填
