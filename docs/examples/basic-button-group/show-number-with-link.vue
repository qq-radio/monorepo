<template>
  <BasicButtonGroup
    :buttons="buttons"
    :show-number="3"
    :buttonProps="{
      link: true,
    }"
  />
</template>

<script lang="tsx" setup>
import { BasicButtonGroup, Button } from "@center/components";

const buttons: Button[] = [
  {
    text: "新增",
    props: {
      type: "primary",
    },
  },
  {
    text: "查看",
    props: {
      type: "success",
    },
  },
  {
    text: "启用",
    props: {
      type: "success",
    },
  },
  {
    text: "禁用",
    props: {
      type: "danger",
    },
  },
  {
    text: "删除",
    props: {
      type: "danger",
    },
  },
];
</script>
