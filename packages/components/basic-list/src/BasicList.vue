<script setup lang="ts">
import { defineProps } from "vue";

interface Item {
  label: string;
  [key: string]: any;
}

const props = defineProps<{
  lists: Item[];
  type: "ul" | "ol";
  childKey?: string;
}>();
</script>

<template>
  <component :is="type">
    <li v-for="item in lists" :key="item.label">
      {{ item.label }}
      <component
        :is="type"
        v-if="childKey && item[childKey] && item[childKey].length > 0"
      >
        <BasicList :lists="item[childKey]" :type="type" :childKey="childKey" />
      </component>
    </li>
  </component>
</template>
