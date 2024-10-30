<template>
  <div>
    <BasicStatus text="示例-1" type="primary" />
    <BasicStatus text="示例-2" type="success" />
    <BasicStatus text="示例-3" type="info" />
    <BasicStatus text="示例-4" type="warning" />
    <BasicStatus text="示例-4" type="danger" />
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
