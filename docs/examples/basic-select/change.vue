<template>
  <BasicSelect v-model="value" :options="options" @change="onChange" />
  <div>当前选中值：{{ value }}</div>
  <div>选中值详细数据：{{ detail }}</div>
</template>

<script setup lang="tsx">
import { BasicSelect } from "@center/components";

const value = ref();
const detail = ref({});

const options = [
  {
    label: "可口可乐",
    value: "coca_cola",
    description: "畅爽好喝每一天",
    price: 6,
  },
  {
    label: "芬达",
    value: "fenda",
    description: "清爽的水果味气泡水",
    price: 8,
  },
  {
    label: "红牛",
    value: "red_bull",
    description: "你的能量超乎你的想象",
    price: 10,
  },
];

const onChange = ({ options }) => {
  detail.value = options;
};
</script>
