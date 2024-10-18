<template>
  <BasicList :lists="lists" :formatter="formatter" />
</template>

<script setup lang="ts">
import { BasicList } from "@center/components";

const lists = [
  {
    label: "欧洲",
    children: [{ label: "法国" }, { label: "德国" }, { label: "意大利" }],
  },
  {
    label: "亚洲",
    children: [{ label: "日本" }, { label: "中国" }, { label: "泰国" }],
  },
  {
    label: "美洲",
    children: [{ label: "美国" }, { label: "加拿大" }],
  },
];

const formatter = (item) => `路线: ${item.label}`;
</script>
