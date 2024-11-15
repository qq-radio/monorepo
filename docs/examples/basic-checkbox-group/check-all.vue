<template>
  <BasicCheckboxGroup v-model="value" :options="options" hasCheckAll />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicCheckboxGroup } from "@center/components";

const value = ref();

const options = [
  { label: "面包", value: "bread" },
  { label: "饼干", value: "cookies" },
  { label: "糖果", value: "candy" },
];
</script>
