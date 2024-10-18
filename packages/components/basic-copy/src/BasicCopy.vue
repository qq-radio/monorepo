<template>
  <div :class="ns.b()">
    <span>{{ value }}</span>
    <el-icon :class="ns.e('icon')" @click="copyToClipboard">
      <DocumentCopy />
    </el-icon>
    <span v-if="showAnimation" :class="ns.e('animation')">复制成功！</span>
  </div>
</template>

<script lang="ts" setup>
import type { BasicCopyProps } from "./type";

import { useBasicNamespace } from "@center/composables";

import { ref } from "vue";
import { DocumentCopy } from "@element-plus/icons-vue";

const ns = useBasicNamespace("copy");

const props = withDefaults(defineProps<BasicCopyProps>(), {
  value: "",
});

const showAnimation = ref(false);

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(props.value);
  showAnimation.value = true;
  setTimeout(() => {
    showAnimation.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
