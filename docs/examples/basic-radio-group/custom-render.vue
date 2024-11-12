<template>
  <BasicRadioGroup v-model="value" :options="options">
    <template #apple="{ option, value }">
      <span style="color: green; display: flex; align-items: center">
        🍏{{
          value === option.value
            ? option.label + option.price + "元"
            : option.label
        }}
      </span>
    </template>
  </BasicRadioGroup>
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicRadioGroup } from "@center/components";
import { Grape, Orange } from "@element-plus/icons-vue";

const value = ref();

const options = [
  {
    label: "葡萄",
    value: "grape",
    price: 7,
    customRender: ({ option, value }) => (
      <span style="color: purple;display:flex; align-items:center">
        <el-icon>
          <Grape />
        </el-icon>
        {value === option.value
          ? option.label + option.price + "元"
          : option.label}
      </span>
    ),
  },
  {
    label: "苹果",
    value: "apple",
    price: 8,
    customSlot: "apple",
  },
  {
    label: "橘子",
    value: "orange",
    price: 9,
    customRender: ({ option, value }) => (
      <span style="color:orange;display:flex; align-items:center">
        <el-icon>
          <Orange />
        </el-icon>
        {value === option.value
          ? option.label + option.price + "元"
          : option.label}
      </span>
    ),
  },
];
</script>
