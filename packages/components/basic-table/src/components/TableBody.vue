<template>
  <el-table
    v-loading="loading"
    v-bind="getBindValues"
    :data="tableDatas"
    @row-click="handleRowClick"
  >
    <template #default>
      <slot name="default">
        <el-table-column
          v-if="hasRadioSelection"
          v-bind="getRadioSelectionColumnProps"
        >
          <template #default="scope">
            <el-radio
              v-model="radioValue"
              :label="scope.row[getBindValues.rowKey]"
            >
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>

        <el-table-column v-if="hasSelection" v-bind="getSelectionColumnProps" />

        <el-table-column v-if="hasIndex" v-bind="getIndexColumnProps" />

        <el-table-column v-if="hasExpand" v-bind="getExpandColumnProps" />

        <template v-for="schema in schemas" :key="schema.prop">
          <el-table-column
            v-if="schema"
            v-bind="schema.columnProps"
            :label="schema.label"
            :prop="schema.prop"
            :fixed="schema.fixed"
            :minWidth="schema.width"
          >
            <template #header="{ $index, column }">
              <TableHeader v-bind="{ rowIndex: $index, column, schema }">
                <template
                  v-for="slotName in Object.keys(tableHeaderSlots)"
                  :key="slotName"
                  #[slotName]="scope"
                >
                  <slot :name="slotName" v-bind="scope" />
                </template>
              </TableHeader>
            </template>
            <template #default="{ row, $index, column }">
              <TableCell v-bind="{ row, rowIndex: $index, column, schema }">
                <template
                  v-for="slotName in Object.keys(tableCellSlots)"
                  :key="slotName"
                  #[slotName]="scope"
                >
                  <slot :name="slotName" v-bind="scope" />
                </template>
              </TableCell>
            </template>
          </el-table-column>
        </template>

        <el-table-column v-if="actions?.length" v-bind="getActionColumnProps">
          <template #default="{ row, $index, column }">
            <BasicButtonGroup
              v-bind="{
                row,
                rowIndex: $index,
                column,
                ...getActionProps,
              }"
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
</template>

<script lang="ts" setup>
import type { TableBodyProps } from "../types";

import { useTableSpecialColumn } from "../hooks/useTableSpecialColumn";
import { useTableDataColumn } from "../hooks/useTableDataColumn";

import { useAttrs, computed, ref, useSlots } from "vue";

import { BasicButtonGroup } from "@center/components";
import TableHeader from "./TableHeader.vue";
import TableCell from "./TableCell.vue";

defineOptions({
  name: "TableBody",
});

const attrs = useAttrs();
const slots = useSlots();

const props = withDefaults(defineProps<TableBodyProps>(), {
  rowKey: "",
});

const getBindValues = computed(() => ({
  border: true,
  highlightCurrentRow: true,
  scrollbarAlwaysOn: true,
  headerCellClassName: "custom-header",
  ...attrs,
  ...props,
}));

const {
  getRadioSelectionColumnProps,
  getSelectionColumnProps,
  getIndexColumnProps,
  getExpandColumnProps,
  getActionColumnProps,
  getActionProps,
} = useTableSpecialColumn(getBindValues);

const { tableHeaderSlots, tableCellSlots } = useTableDataColumn(getBindValues, {
  slots,
});

const radioValue = ref();

const handleRowClick = (row: Recordable) => {
  radioValue.value = row[getBindValues.value.rowKey];
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
