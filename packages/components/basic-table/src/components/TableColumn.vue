<template>
  <div>
    <component v-if="isCustomCell" :is="renderLabelField" />

    <BasicDisplay
      v-else-if="isString(schema.display)"
      :type="schema.display"
      :value="formattedValue"
      :custom-props="schema.displayProps"
    />
    <span v-else>
      {{ formattedValue }}
    </span>
    <el-tooltip v-if="schema.tooltip" :content="schema.tooltip" placement="top">
      <el-icon :size="16"><QuestionFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnProps, TableColumnCallbackParams } from "../types";

import { computed } from "vue";
import { isFunction, isString } from "lodash";

import { BasicRender } from "@center/components/basic-render";
import { BasicDisplay } from "@center/components/basic-display";
import { QuestionFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "TableColumn",
});

const props = withDefaults(defineProps<TableColumnProps>(), {
  type: "default",
  schema: () => ({
    prop: "",
    label: "",
  }),
});

const params = computed<TableColumnCallbackParams>(() => {
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

const isCustomCell = props.schema.customRender || props.schema.customSlot;
</script>
