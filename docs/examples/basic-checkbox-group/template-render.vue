<template>
  <BasicCheckboxGroup
    v-model="value"
    :options="options"
    :render="customDrinkRender"
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="tsx">
import { BasicCheckboxGroup } from "@center/components";
import { IceDrink } from "@element-plus/icons-vue";

const value = ref();

const options = [
  { label: "咖啡", value: "coffee", price: 10 },
  { label: "牛奶", value: "milk_tea", price: 5 },
  { label: "果汁", value: "juice", price: 8 },
];

const customDrinkRender = ({ option }) => (
  <span style="display: flex; align-items: center">
    <el-icon>
      <IceDrink />
    </el-icon>
    <span style="margin-left: 8px">
      {option.label}({option.price}元)
    </span>
  </span>
);
</script>
