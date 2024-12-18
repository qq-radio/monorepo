<template>
  <span
    v-for="({ text, type, color }, index) in getContents"
    :key="index"
    :class="ns.b()"
  >
    <span
      :class="[ns.e('circle'), ns.em('circle', type)]"
      :style="{
        backgroundColor: color,
      }"
    />
    <span :class="ns.e('text')">
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import type { BasicStatusProps } from "./type";

import { useBasicNamespace } from "@center/composables";
import { computed } from "vue";

const ns = useBasicNamespace("status");

defineOptions({
  name: "BasicStatus",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicStatusProps>(), {
  text: "",
  type: "primary",
});

const getContents = computed(() =>
  Array.isArray(props.contents)
    ? props.contents
    : [{ text: props.text, type: props.type, color: props.color }]
);
</script>

<style scoped lang="scss">
@use "./style.scss";
</style>
