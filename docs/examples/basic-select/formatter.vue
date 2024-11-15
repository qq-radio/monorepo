<template>
  <BasicSelect
    v-model="value"
    multiple
    :formatter="formatter"
    :options="options"
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicSelect } from "@center/components";

const value = ref();

const options = [
  { province: "广东", city: "佛山", region: "顺德区", code: "shun_de" },
  { province: "广东", city: "汕头", region: "金平区", code: "jin_ping" },
  { province: "广东", city: "深圳", region: "南山区", code: "nan_shan" },
];

const formatter = (option) => ({
  ...option,
  label: `${option.province}/${option.city}/${option.region}`,
  value: option.code,
});
</script>
