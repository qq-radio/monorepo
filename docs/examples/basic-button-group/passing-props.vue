<template>
  <BasicButtonGroup
    :buttonProps="{
      type: 'success',
      size: 'large',
      plain: true,
    }"
    :buttons="buttons"
  />
</template>

<script lang="ts" setup>
import { BasicButtonGroup, Button } from "@center/components";

const buttons: Button[] = [
  {
    text: "新增",
  },
  {
    text: "编辑",
  },
  {
    text: "删除",
    props: {
      link: true,
      type: "danger",
    },
  },
];
</script>
