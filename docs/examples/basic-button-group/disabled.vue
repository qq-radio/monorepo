<template>
  <span style="vertical-align: middle; padding-right: 4px">是否禁用</span>
  <el-switch v-model="isDisabled" style="margin-right: 40px" />
  <BasicButtonGroup :buttons="buttons" />
</template>

<script setup lang="ts">
import { BasicButtonGroup, Button } from "@center/components";

const isDisabled = ref(false);

const buttons: Button[] = [
  {
    text: "编辑",
    disabled: isDisabled,
    onClick: () => {
      console.log("点击了编辑");
    },
  },
];
</script>
