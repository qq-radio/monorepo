<template>
  <component :is="renderComponent" />
</template>

<script lang="ts" setup>
import type { BasicRenderProps } from "./type";

import { isFunction } from "lodash";

import { useOptionQuery, useCustomRender } from "@center/composables";

const { renderItem } = useCustomRender({});

defineOptions({
  name: "BasicRender",
});

const props = withDefaults(defineProps<BasicRenderProps>(), {});

const renderComponent = renderItem(
  {},
  {
    fallbackContent: 555,
  }
);
</script>
