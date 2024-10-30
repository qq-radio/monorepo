<template>
  <div>
    <BasicStatus text="示例-2" color="#de7a5f" />
    <BasicStatus text="示例-1" color="#b7cbc2" />
    <BasicStatus text="示例-3" color="#484686" />
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
