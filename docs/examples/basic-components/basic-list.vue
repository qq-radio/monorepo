<template>
  <CollectContainer>
    <template #desc>使用无序列表ul标签渲染 - 公司部门结构</template>
    <BasicList :lists="unorderList" type="ul" childKey="children" />
  </CollectContainer>

  <CollectContainer>
    <template #desc>使用有序列表ol标签渲染，并指定childKey - 产品分类</template>
    <BasicList :lists="orderList" type="ol" childKey="childrenList" />
  </CollectContainer>
</template>

<script setup lang="ts">
import { BasicList } from "@center/components";

import CollectContainer from "../CollectContainer.vue";

const unorderList = [
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

const orderList = [
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
          { label: "功能手机" },
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
