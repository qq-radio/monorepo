<template>
  <div :class="ns.b()">
    <span>{{ text }}</span>
    <el-icon :class="ns.e('icon')" @click="copyToClipboard">
      <DocumentCopy />
    </el-icon>
    <span v-if="showAnimation" :class="ns.e('animation')">复制成功!</span>
  </div>
</template>

<script setup lang="ts">
import type { BasicCopyProps } from "./type";

import { useBasicNamespace } from "@center/composables";

import { ref } from "vue";
import { DocumentCopy } from "@element-plus/icons-vue";

const ns = useBasicNamespace("copy");

defineOptions({
  name: "BasicCopy",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicCopyProps>(), {});

const showAnimation = ref(false);

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(props.text);
  showAnimation.value = true;
  setTimeout(() => {
    showAnimation.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
@use "./style.scss";
</style>
