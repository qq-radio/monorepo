<template>
  <BasicStatus
    :contents="[
      {
        text: '示例-1',
        type: 'primary',
      },
      {
        text: '示例-2',
        type: 'success',
      },
      {
        text: '示例-3',
        color: '#f0e291',
      },
    ]"
  />
</template>

<script setup lang="ts">
import { BasicStatus } from "@center/components";
</script>

<style scoped lang="scss">
:deep(.basic-status) {
  margin-right: 30px;
}
</style>
