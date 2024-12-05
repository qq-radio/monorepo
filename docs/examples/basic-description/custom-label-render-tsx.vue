<template>
  <BasicDescription :column="2" :data="data" :schemas="schemas" />
</template>

<script lang="tsx" setup>
import { BasicDescription, DescriptionSchema } from "@center/components";

import { Monitor } from "@element-plus/icons-vue";

const data = {
  productName: "笔记本电脑",
  price: 3999.9901,
  stockQuantity: 150,
  lastUpdated: new Date().toLocaleString(),
};

const schemas: DescriptionSchema[] = [
  {
    label: "产品名称",
    prop: "productName",
    customLabelRender: () => (
      <el-icon>
        <Monitor />
      </el-icon>
    ),
  },
  {
    label: "价格",
    prop: "price",
    formatter: ({ value }) => `￥${value.toFixed(2)}`,
  },
  {
    label: "库存数量",
    prop: "stockQuantity",
    formatter: ({ value }) => `${value}件`,
  },
  {
    label: "上次更新",
    prop: "lastUpdated",
  },
];
</script>
