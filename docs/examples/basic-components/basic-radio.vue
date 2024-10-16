<template>
  <h5>数据收集之BasicRadio单选</h5>
  <br />

  <CollectContainer>
    <template #desc>
      <div>基本使用</div>
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
          disabled: true,
          border: true,
        },
      ]"
    />
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
    <template #desc>若希望选项值来自后端接口，请传入api</template>
    <template #value>{{ state.value5 }}</template>
    <BasicRadioGroup v-model="state.value5" :api="api" />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >可传入resultField、labelField、valueField自动构建options</template
    >
    <template #value>
      <div>{{ state.value6 }}</div>
    </template>
    <BasicRadioGroup
      v-model="state.value6"
      :api="api2"
      v-bind="{
        resultField: 'result',
        labelField: 'userName',
        valueField: 'age',
      }"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc> 更灵活的渲染：customRender渲染、customSlot渲染 </template>
    <template #value>{{ state.value7 }}</template>
    <BasicRadioGroup v-model="state.value7" :options="renderOptions">
      <template #slot-watermelon="{ option }">
        <span style="color: red; display: flex; align-items: center">
          <el-icon>
            <Watermelon />
          </el-icon>
          {{ option.label }}
        </span>
      </template>
    </BasicRadioGroup>
  </CollectContainer>

  <CollectContainer>
    <template #desc>自定义模板 customRender</template>
    <template #value>{{ state.value8 }}</template>
    <BasicRadioGroup
      v-model="state.value8"
      :options="customRenderOptions"
      :render="customRender"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc>自定义模板 default slot</template>
    <template #value>{{ state.value9 }}</template>
    <BasicRadioGroup v-model="state.value9" :options="defaultSlotOptions">
      <template #default="{ option }">
        <span style="display: flex; align-items: center">
          <el-icon style="margin-right: 8px"><Calendar /> </el-icon
          >{{ option.label }}(农历{{ option.time }})
        </span>
      </template>
    </BasicRadioGroup>
  </CollectContainer>
</template>

<script setup lang="tsx">
import { BasicRadioGroup } from "@center/components";

import CollectContainer from "../CollectContainer.vue";

import {
  Grape,
  Watermelon,
  Orange,
  StarFilled,
  Calendar,
} from "@element-plus/icons-vue";

const state = ref({
  value1: undefined,
  value2: undefined,
  value3: undefined,
  value4: 2,
  value5: undefined,
  value6: undefined,
  value7: undefined,
  value8: undefined,
  value9: undefined,
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

const api2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "响应成功",
        result: [
          {
            userName: "小明",
            address: "广州",
            age: 18,
          },
          {
            userName: "小红",
            address: "深圳",
            age: 19,
          },
        ],
      });
    }, 1000);
  });
};

const moreValues = ref();
const onChange = ({ label, value, option }) => {
  moreValues.value = option;
};

const renderOptions = [
  {
    label: "葡萄",
    value: "grape",
    customRender: ({ option }) => (
      <span style="color: purple;display:flex; align-items:center">
        <el-icon>
          <Grape />
        </el-icon>
        {option.label}
      </span>
    ),
  },
  {
    label: "西瓜",
    value: "watermelon",
    customSlot: "slot-watermelon",
  },
  {
    label: "橘子",
    value: "orange",
    customRender: ({ option }) => (
      <span style="color:orange;display:flex; align-items:center">
        <el-icon>
          <Orange />
        </el-icon>
        {option.label}
      </span>
    ),
  },
];

const customRender = ({ option }) => {
  return (
    <div style="display:flex; align-items:center">
      <el-icon>
        <StarFilled />
      </el-icon>
      <el-icon>
        <StarFilled />
      </el-icon>
      <span>{option.label}</span>-<span>{option.en}</span>
      <el-icon>
        <StarFilled />
      </el-icon>
      <el-icon>
        <StarFilled />
      </el-icon>
    </div>
  );
};

const customRenderOptions = [
  {
    label: "北京",
    en: "Beijing",
    value: "beijing",
  },
  {
    label: "上海",
    en: "shanghai",
    value: "shanghai",
  },
  {
    label: "深圳",
    en: "Shenzhen",
    value: "shenzhen",
  },
];

const defaultSlotOptions = [
  {
    label: "元宵节",
    time: "正月十五",
    value: "1.15",
  },
  {
    label: "端午节",
    time: "五月初五",
    value: "5.5",
  },
  {
    label: "中秋节",
    time: "农历八月十五",
    value: "8.15",
  },
];
</script>
