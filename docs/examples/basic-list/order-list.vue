<template>
  <BasicList :lists="lists" type="ol" child-key="childrenList" />
</template>

<script setup lang="ts">
import { BasicList } from "@center/components";

const lists = [
  {
    label: "电子产品",
    childrenList: [
      {
        label: "手机",
        childrenList: [
          {
            label: "智能手机",
            childrenList: [{ label: "安卓手机" }, { label: "苹果手机" }],
          },
        ],
      },
      {
        label: "电脑",
        childrenList: [
          {
            label: "笔记本",
            childrenList: [{ label: "游戏本" }, { label: "商务本" }],
          },
          { label: "台式机" },
        ],
      },
    ],
  },
  {
    label: "家用电器",
    childrenList: [
      {
        label: "厨房电器",
        childrenList: [
          {
            label: "冰箱",
            childrenList: [{ label: "双开门冰箱" }, { label: "单开门冰箱" }],
          },
          { label: "微波炉" },
        ],
      },
    ],
  },
  { label: "家具" },
];
</script>
