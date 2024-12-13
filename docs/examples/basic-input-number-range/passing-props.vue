<template>
  <BasicInputNumberRange
    v-model="value"
    :inputNumberProps="{
      controls: true,
      step: 0.2,
      precision: 2,
      size: 'large',
    }"
  />
  <div style="margin-top: 10px">双向绑定值：{{ value }}</div>
</template>

<script setup lang="ts">
import { BasicInputNumberRange } from "@center/components";

const value = ref();
</script>
