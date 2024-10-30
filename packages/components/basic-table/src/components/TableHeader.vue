<template>
  <component v-if="isCustomHeader" :is="renderCustomHeader" />
  <span v-else>
    {{ schema.label }}
  </span>
  <el-tooltip v-if="schema.tooltip" :content="schema.tooltip" placement="top">
    <el-icon :size="16"><QuestionFilled /></el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>
import type { TableHeaderProps, TableHeaderCallbackParams } from "../types";

import { useCustomRender } from "@center/composables";

import { useSlots, computed } from "vue";

import { QuestionFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "TableHeader",
});

const slots = useSlots();

const props = withDefaults(defineProps<TableHeaderProps>(), {
  schema: () => ({
    prop: "",
    label: "",
  }),
});

const params = computed<TableHeaderCallbackParams>(() => {
  const { rowIndex, column, schema } = props;
  return {
    rowIndex,
    column,
    schema,
  };
});

const { renderItem } = useCustomRender({ slots });

const isCustomHeader =
  props.schema.customHeaderRender || props.schema.customHeaderSlot;

const renderCustomHeader = renderItem(
  {
    customRender: props.schema.customHeaderRender,
    customSlot: props.schema.customHeaderSlot,
  },
  params.value
);
</script>
