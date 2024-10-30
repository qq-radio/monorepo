<template>
  <div>
    <BasicStatus>示例-1</BasicStatus>
    <BasicStatus text="示例-2" type="warning" />
  </div>
</template>

<script setup lang="ts">
import { BasicStatus } from "@center/components";
</script>

<style lang="scss" scoped>
:deep(.basic-status) {
  margin-right: 30px;
}
</style>
