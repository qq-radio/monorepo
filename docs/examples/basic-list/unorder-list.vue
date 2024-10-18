<template>
  <BasicList :lists="lists" />
</template>

<script setup lang="ts">
import { BasicList } from "@center/components";

const lists = [
  {
    label: "公司总部",
    children: [
      {
        label: "人力资源部",
        children: [{ label: "招聘组" }, { label: "培训组" }],
      },
      {
        label: "技术部",
        children: [
          {
            label: "前端开发组",
            children: [{ label: "UI/UX设计组" }, { label: "UI/UX设计组=???" }],
          },
          { label: "后端开发组" },
        ],
      },
      { label: "财务部" },
    ],
  },
  {
    label: "分公司 A",
    children: [
      {
        label: "销售部",
        children: [
          { label: "区域销售组", children: [{ label: "华东销售小组" }] },
        ],
      },
    ],
  },
  { label: "分公司 B" },
];
</script>
