<template>
  <BasicRadioGroup v-model="value" :options="options">
    <template #apple="{ option }">
      <span style="color: red; display: flex; align-items: center">
        <el-icon><Watermelon /></el-icon>🍏{{ option.label }}
      </span>
    </template>
  </BasicRadioGroup>
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicRadioGroup } from "@center/components";
import { Grape, Watermelon, Orange } from "@element-plus/icons-vue";

const value = ref();

const options = [
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
    label: "苹果",
    value: "apple",
    customSlot: "apple",
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
</script>
