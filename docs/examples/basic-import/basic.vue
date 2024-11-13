<template>
  <BasicImport
    v-bind="{
      templateConfig,
      uploadConfig,
      importConfig,
    }"
    @success="handleSuccess"
  />
</template>

<script lang="tsx" setup>
import {
  BasicImport,
  TemplateConfig,
  UploadConfig,
  ImportConfig,
} from "@center/components";

const templateConfig: TemplateConfig = {
  url: "mock-url",
  fileName: "模板",
};

const uploadConfig: UploadConfig = {
  url: "mock-url",
};

const importConfig: ImportConfig = {
  api: () => new Promise(() => "mock-api"),
  params: {
    id: "mock-id",
  },
};

const handleSuccess = () => {
  console.log("导入成功");
};
</script>
