<template>
  <BasicButtonGroup :buttons="buttons" :show-number="3" />
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
];
</script>
