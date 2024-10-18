<template>
  <component :is="type">
    <li v-for="item in lists" :key="item.label">
      {{ formatLabel(item) }}
      <component
        :is="type"
        v-if="childKey && item[childKey] && item[childKey].length > 0"
      >
        <BasicList
          v-bind="{
            lists: item[childKey],
            type,
            childKey,
            formatter,
          }"
        />
      </component>
    </li>
  </component>
</template>

<script setup lang="ts">
import { BasicListProps } from "./type";

import { defineProps, watchEffect } from "vue";
import { isFunction } from "lodash";

defineOptions({
  name: "BasicList",
});

const props = withDefaults(defineProps<BasicListProps>(), {
  type: "ul",
  childKey: "children",
  lists: () => ({}),
});

const formatLabel = (item) =>
  isFunction(props.formatter) ? props.formatter(item) : item.label;
</script>
