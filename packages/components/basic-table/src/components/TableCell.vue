<template>
  <component v-if="isCustomCell" :is="renderCustomCell" />
  <BasicDisplay
    v-else-if="schema.display && hasComponent(schema.display)"
    v-bind="schema.displayProps"
    :type="schema.display"
    :value="formattedValue"
  />
  <span v-else>
    {{ formattedValue }}
  </span>
</template>

<script setup lang="ts">
import type { TableCellProps, TableCellCallbackParams } from "../types";

import { useCustomRender } from "@center/composables";

import { useSlots, computed } from "vue";
import { isFunction } from "lodash";

import { BasicDisplay, hasComponent } from "@center/components/basic-display";

defineOptions({
  name: "TableCell",
});

const slots = useSlots();

const props = withDefaults(defineProps<TableCellProps>(), {
  schema: () => ({
    prop: "",
    label: "",
  }),
});

const params = computed<TableCellCallbackParams>(() => {
  const { row = {}, rowIndex, column, schema } = props;
  const value = schema.prop && row[schema.prop];
  return {
    row,
    rowIndex,
    column,
    schema,
    value,
  };
});

const formattedValue = computed(() => {
  const {
    schema: { formatter },
  } = props;

  return isFunction(formatter)
    ? formatter({ ...params.value })
    : params.value.value;
});

const { renderItem } = useCustomRender({ slots });

const isCustomCell = props.schema.customRender || props.schema.customSlot;

const renderCustomCell = renderItem(
  {
    customRender: props.schema.customRender,
    customSlot: props.schema.customSlot,
  },
  params.value
);
</script>
