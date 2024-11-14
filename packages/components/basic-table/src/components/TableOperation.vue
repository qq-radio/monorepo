<template>
  <div class="operations">
    <template v-for="button in getButtons" :key="button.text">
      <template v-if="button.type === 'import'">
        <BasicImport
          v-bind="button.props"
          :disabled="button.disabled"
          @success="emit('success')"
        />
      </template>
      <template v-else-if="button.type === 'export'">
        <BasicExport v-bind="button.props" />
      </template>
      <template v-else>
        <el-button
          v-bind="{
            type: 'primary',
            ...button.props,
          }"
          :disabled="button.disabled"
          @click="handleClick(button)"
          >{{ button.text }}</el-button
        >
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  TableOperationProps,
  TableOperationEmits,
  OperationButton,
} from "../types";

import { usePermission } from "@center/composables";

import { computed } from "vue";
import { isFunction } from "lodash";

import { BasicImport } from "@center/components/basic-import";
import { BasicExport } from "@center/components/basic-export";

defineOptions({
  name: "TableOperation",
});

const props = withDefaults(defineProps<TableOperationProps>(), {
  buttons: () => [],
});

const emit = defineEmits<TableOperationEmits>();

const { checkButtonPermission } = usePermission();

const getButtons = computed(() =>
  props.buttons.filter((item) => checkButtonPermission(item.permission))
);

const handleClick = (button: OperationButton) => {
  const { onClick } = button;
  if (onClick && isFunction(onClick)) {
    onClick();
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
