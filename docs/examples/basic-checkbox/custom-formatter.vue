<template>
  <BasicCheckboxGroup
    v-model="value"
    multiple
    :formatter="
      (option) => ({
        ...option,
        label: `${option.province}/${option.city}/${option.region}`,
        value: option.code,
      })
    "
    :options="options"
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicCheckboxGroup } from "@center/components";

const value = ref();

const options = [
  { province: "福建", city: "泉州", region: "鲤城区", code: "li_cheng" },
  { province: "广东", city: "深圳", region: "南山区", code: "nan_shan" },
  { province: "广东", city: "深圳", region: "龙岗区", code: "long_gang" },
];
</script>
