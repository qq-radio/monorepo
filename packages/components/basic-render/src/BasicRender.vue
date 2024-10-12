<template>
  <component :is="renderComponent" />
</template>

<script lang="ts" setup>
import type { BasicRenderProps } from "./type";

import { isFunction } from "lodash";

defineOptions({
  name: "BasicRender",
});

const props = withDefaults(defineProps<BasicRenderProps>(), {});

const renderComponent = () => {
  try {
    if (!isFunction(props.render)) {
      return;
    }

    return props.render(props.params);
  } catch (error) {
    console.error("BasicRender Error:", error);
  }
};
</script>
