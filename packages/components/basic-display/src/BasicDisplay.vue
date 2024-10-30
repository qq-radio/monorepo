<template>
  <component
    :is="getComponent(props.type)"
    v-if="hasComponent(type)"
    v-bind="getBindValues"
  />
</template>

<script lang="ts" setup>
import type { BasicDisplayProps } from "./type";

import { hasComponent, getComponent } from "./tools/component";
import { mergeComponentProps } from "./tools/component-props";

import { useAttrs, computed } from "vue";

defineOptions({
  name: "BasicDisplay",
});

const attrs = useAttrs();

const props = withDefaults(defineProps<BasicDisplayProps>(), {
  value: "",
});

const getBindValues = computed(() => ({
  ...mergeComponentProps(props.type, props.value, attrs),
  value: props.value,
}));
</script>
