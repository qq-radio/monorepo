<template>
  <component
    :is="getComponent(props.type)"
    v-if="hasComponent(type)"
    v-bind="displayProps"
  >
    <template v-for="(fieldSlot, key) in displaySlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>
  </component>
</template>

<script setup lang="ts">
import type { BasicDisplayProps } from "./type";

import { hasComponent, getComponent } from "./tools/component";

defineOptions({
  name: "BasicDisplay",
});

const props = withDefaults(defineProps<BasicDisplayProps>(), {});
</script>
