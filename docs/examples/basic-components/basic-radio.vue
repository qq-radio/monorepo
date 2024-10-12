<template>
  <h5>数据收集之BasicRadio单选</h5>
  <br />

  <CollectContainer>
    <template #desc>单个用法</template>
    <template #value>{{ state.value1 }}</template>
    <BasicRadioGroup v-model="state.value1" label="选项-1" :value="1" />
  </CollectContainer>

  <CollectContainer>
    <template #desc>未传value时，label会作为value使用</template>
    <template #value>{{ state.value3 }}</template>
    <BasicRadioGroup v-model="state.value3" label="选项-3" />
  </CollectContainer>

  <CollectContainer>
    <template #desc>
      <div>传入options渲染多个radio，并且单独禁用第3个radio</div>
    </template>
    <template #value>{{ state.value4 }}</template>
    <BasicRadioGroup
      v-model="state.value4"
      :options="[
        {
          label: '选项-option-1',
          value: 1,
        },
        {
          label: '选项-option-2',
          value: 2,
        },
        {
          label: '选项-option-3',
          value: 3,
          customProps: { disabled: true },
        },
      ]"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc>若希望选项值来自后端接口，请传入api</template>
    <template #value>{{ state.value5 }}</template>
    <BasicRadioGroup v-model="state.value5" :api="api" />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >默认v-model接收的值为单选项的value，如果希望拿到除了value
      之外的其它内容，应监听change事件</template
    >
    <template #value>
      <div>{{ state.value6 }}</div>
      <div>{{ moreValues }}</div>
    </template>
    <BasicRadioGroup v-model="state.value6" :api="api" @change="onChange" />
  </CollectContainer>

  <CollectContainer>
    <template #desc>
      更灵活的渲染：按render > slot > label的优先级进行radio渲染
    </template>
    <template #value>{{ state.value7 }}</template>
    <BasicRadioGroup v-model="state.value7" :options="renderOptions">
      <template #custom-slot>用slot方式渲染（优先级2）</template>
    </BasicRadioGroup>
  </CollectContainer>
</template>

<script setup lang="tsx">
import { BasicRadioGroup } from "@center/components";

import CollectContainer from "../CollectContainer.vue";

const state = ref({
  value1: undefined,
  value2: undefined,
  value3: undefined,
  value4: 2,
  value5: undefined,
  value6: undefined,
  value7: undefined,
  value8: undefined,
});

const api = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: "api-option-1",
          value: 11,
          userName: "小明",
          address: "广州",
          age: 18,
        },
        {
          label: "api-option-2",
          value: 22,
          userName: "小红",
          address: "深圳",
          age: 19,
        },
      ]);
    }, 1000);
  });
};

const moreValues = ref();
const onChange = ({ label, value, option }) => {
  moreValues.value = option;
};

const renderOptions = [
  {
    label: "1",
    value: 1,
    customRender: () => h("div", "使用h渲染（优先级1）"),
  },
  {
    label: "2",
    value: 2,
    customRender: <div>使用render jsx渲染（优先级1）</div>,
  },
  {
    label: "3",
    value: 3,
    customSlot: "custom-slot",
  },
  {
    value: "4",
    label: "普通的label渲染，优先级最低",
  },
];
</script>
