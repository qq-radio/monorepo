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
    description: "经典可乐，充满气泡的可乐味道。",
    price: 10,
    available: true,
    brand: "可口可乐公司",
  },
  {
    label: "芬达",
    value: "fenda",
    description: "清爽的水果味汽水，适合夏天饮用。",
    price: 10,
    available: true,
    brand: "可口可乐公司",
  },
  {
    label: "绿茶饮料",
    value: "lipton_green_tea",
    description: "清爽的绿茶饮料，低热量。",
    price: 12,
    available: true,
    brand: "立顿",
  },
];

const onChange = ({ options }) => {
  detail.value = options;
};
</script>
