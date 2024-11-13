<template>
  <BasicExport
    v-bind="{
      config,
    }"
    @success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { BasicExport, ExportConfig } from "@center/components";

const config: ExportConfig = {
  url: "mock-url",
  params: () => {},
  fileName: "导出",
};

const handleSuccess = () => {
  console.log("导入成功");
};
</script>
