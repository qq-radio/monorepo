<template>
  <BasicCheckboxGroup v-model="value" :options="options" />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicCheckboxGroup } from "@center/components";

const value = ref();

const options = [
  { label: "苹果", value: "iphone" },
  { label: "小米", value: "xiaomi" },
  { label: "华为", value: "huawei" },
];
</script>
