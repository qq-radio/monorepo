<template>
  <div>
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      :data="datas"
      :border="true"
      highlight-current-row
      scrollbar-always-on
      header-cell-class-name="custom-header"
      @row-click="handleRowClick"
    >
      <template #default>
        <slot name="default">
          <el-table-column v-if="hasRadioSelection" width="54" align="center">
            <template #default="scope">
              <el-radio
                v-model="radioValue"
                :label="scope.row[radioSelectionKey]"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>

          <el-table-column
            v-if="hasSelection"
            key="selection"
            type="selection"
            v-bind="selectionColumnProps"
          />

          <el-table-column
            v-if="hasIndex"
            key="index"
            type="index"
            label="序号"
            width="60"
            v-bind="indexColumnProps"
          />

          <el-table-column
            v-if="hasExpand"
            key="expand"
            type="expand"
            v-bind="expandColumnProps"
          >
            <template #default="scoped">
              <div>
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>

          <template v-for="schema in schemas" :key="schema.prop">
            <el-table-column
              v-if="schema"
              v-bind="schema.columnProps"
              :label="schema.label"
              :prop="schema.prop"
              :fixed="schema.fixed"
              :minWidth="schema.width || columnWidth"
            >
              <template #default="{ row, $index, column }">
                <TableColumn
                  type="default"
                  v-bind="{ row, rowIndex: $index, column, schema }"
                >
                  <template
                    v-for="slotName in Object.keys(slots)"
                    :key="slotName"
                    #[slotName]="scope"
                  >
                    <slot :name="slotName" v-bind="scope" />
                  </template>
                </TableColumn>
              </template>
            </el-table-column>
          </template>

          <el-table-column
            v-if="hasAction || actions?.length"
            v-bind="getActionColumnProps"
          >
            <template #default="{ row, $index, column }">
              <TableAction
                v-bind="{ row, rowIndex: $index, column, ...actionProps }"
                :buttons="actions || []"
              />
            </template>
          </el-table-column>
        </slot>
      </template>

      <template #append>
        <slot name="append" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableBodyProps } from "../types";

import { computed, ref, useSlots } from "vue";

import TableColumn from "./TableColumn.vue";
import TableAction from "./TableAction.vue";

defineOptions({
  name: "TableBody",
});

const slots = useSlots();

const props = withDefaults(defineProps<TableBodyProps>(), {
  datas: () => [],
  radioSelectionKey: "id",
  selectionColumnProps: () => ({}),
  indexColumnProps: () => ({}),
  expandColumnProps: () => ({}),
  actionColumnProps: () => ({}),
});

const getActionColumnProps = computed(() => ({
  label: "操作",
  fixed: "right",
  width: 160,
  ...props.actionColumnProps,
}));

const radioValue = ref();

const handleRowClick = (row: Recordable) => {
  radioValue.value = row[props.radioSelectionKey];
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
