<template>
  <BasicSelect
    v-model="value"
    v-bind="{
      resultField: 'data',
      labelField: 'province',
      valueField: 'name',
    }"
    :api="api"
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicSelect } from "@center/components";

const value = ref();

const api = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "响应成功",
        data: [
          { province: "北京", name: "beijing" },
          { province: "上海", name: "shanghai" },
          { province: "广州", name: "guangzhou" },
          { province: "深圳", name: "shenzhen" },
        ],
      });
    }, 1000);
  });
};
</script>
