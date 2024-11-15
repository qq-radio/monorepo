<template>
  <BasicSelectInput
    v-model="value"
    placeholder="请选择"
    @click="clickInput"
    @clear="clearInput"
  />
</template>

<script setup lang="tsx">
import { BasicSelectInput } from "@center/components";

const value = ref([]);

const clickInput = () => {
  console.log("点击input");
};

const clearInput = () => {
  console.log("清空");
};
</script>
