<template>
  <div :class="ns.b()">
    <div :class="ns.e('search')">
      <BasicForm
        v-if="getSearchSchemas?.length"
        v-bind="getSearchProps"
        v-model="searchParams"
        :schemas="getSearchSchemas"
        :loading="isLoading"
        submitText="查询"
        labelPosition="left"
        hasFooter
        @submit="reQuery"
        @reset="reQuery"
      />
      <div>
        <slot name="operation-before" />
        <BasicButtonGroup :buttons="getProps.operations" @success="reQuery" />
        <slot name="operation-after" />
      </div>
    </div>
    <div :class="ns.e('body')">
      <el-table
        v-bind="getBindValues"
        v-loading="isLoading"
        :data="tableDatas"
        @selection-change="handleSelectionChange"
        @row-click="handleRadioSelectionChange"
      >
        <template #default>
          <slot name="default">
            <el-table-column
              v-if="hasRadioSelection"
              v-bind="getRadioSelectionColumnProps"
            >
              <template #default="scope">
                <el-radio
                  v-model="radioSelectedValue"
                  :label="scope.row[getBindValues.rowKey]"
                >
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>

            <el-table-column
              v-if="hasSelection"
              v-bind="getSelectionColumnProps"
            />

            <el-table-column v-if="hasIndex" v-bind="getIndexColumnProps" />

            <el-table-column v-if="hasExpand" v-bind="getExpandColumnProps">
              <template #default="{ row, $index, expanded }">
                <slot
                  name="expand"
                  v-bind="{ row, rowIndex: $index, expanded }"
                />
              </template>
            </el-table-column>

            <template v-for="schema in tableSchemas" :key="schema.prop">
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
                      v-for="name in Object.keys(tableHeaderSlots)"
                      :key="name"
                      #[name]="scope"
                    >
                      <slot :name="name" v-bind="scope" />
                    </template>
                  </TableHeader>
                </template>
                <template #default="{ row, $index, column }">
                  <TableCell v-bind="{ row, rowIndex: $index, column, schema }">
                    <template
                      v-for="name in Object.keys(tableCellSlots)"
                      :key="name"
                      #[name]="scope"
                    >
                      <slot :name="name" v-bind="scope" />
                    </template>
                  </TableCell>
                </template>
              </el-table-column>
            </template>

            <el-table-column
              v-if="actions?.length"
              v-bind="getActionColumnProps"
            >
              <template #default="{ row, $index, column }">
                <BasicButtonGroup
                  v-bind="getActionProps"
                  :callbackParams="{
                    row,
                    rowIndex: $index,
                    column,
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
    </div>
    <div :class="ns.e('page')">
      <BasicPagination
        v-bind="getPaginationProps"
        v-model="page"
        @current-change="query"
        @size-change="query"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BasicTableProps, BasicTableEmits, TableMethods } from "./types";

import { useBasicNamespace } from "@center/composables";

import { useTableSearch } from "./hooks/useTableSearch";
import { useTableData } from "./hooks/useTableData";
import { useTableSpecialColumn } from "./hooks/useTableSpecialColumn";
import { useTableDataColumn } from "./hooks/useTableDataColumn";
import { useTableRadioSelection } from "./hooks/useTableRadioSelection";
import { useTableSelection } from "./hooks/useTableSelection";
import { useTablePagination } from "./hooks/useTablePagination";

import { useAttrs, useSlots, ref, computed, unref, onMounted } from "vue";
import { pick } from "lodash";

import { BasicPagination } from "@center/components/basic-pagination";
import { BasicForm } from "@center/components/basic-form";
import { BasicButtonGroup } from "@center/components/basic-button-group";
import TableHeader from "./components/TableHeader.vue";
import TableCell from "./components/TableCell.vue";

const ns = useBasicNamespace("table");

defineOptions({
  name: "BasicTable",
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

const emit = defineEmits<BasicTableEmits>();

const props = withDefaults(defineProps<BasicTableProps>(), {
  schemas: () => [],
  extraParams: () => ({}),
  immediate: true,
  loading: false,
  ellipsis: false,
  rowKey: "id",
});

const propsRef = ref<Partial<BasicTableProps>>();

const getProps = computed<BasicTableProps>(() => {
  return { ...props, ...unref(propsRef) };
});

function setProps(partialProps: Partial<BasicTableProps>) {
  propsRef.value = { ...unref(propsRef), ...partialProps };
}

const defaultAttrs = {
  border: true,
  highlightCurrentRow: true,
  scrollbarAlwaysOn: true,
  headerCellClassName: "custom-header",
};

const getBindValues = computed(() => ({
  ...defaultAttrs,
  ...attrs,
  ...pick(getProps.value, [
    "rowKey",
    "hasRadioSelection",
    "radioSelectionColumnProps",
    "hasSelection",
    "selectionColumnProps",
    "hasIndex",
    "indexColumnProps",
    "hasExpand",
    "expandColumnProps",
    "actionColumnProps",
    "actionProps",
    "actions",
  ]),
}));

const { getSearchProps, getSearchSchemas, searchParams } = useTableSearch(
  getProps,
  { slots }
);

const { getPaginationProps, page, setPagination } =
  useTablePagination(getProps);

const {
  isLoading,
  tableDatas,
  tableSchemas,
  query,
  reQuery,
  getRequestParams,
} = useTableData(getProps, { searchParams, page, setPagination });

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

const {
  radioSelectedValue,
  handleRadioSelectionChange,
  setRadioSelectedRow,
  getRadioSelectedRow,
  clearRadioSelectedRow,
} = useTableRadioSelection(
  pick(getBindValues.value, "rowKey", "hasRadioSelection")
);

const {
  handleSelectionChange,
  getSelectedRows,
  getSelectedIds,
  checkHasSelection,
  validateHasSelection,
} = useTableSelection(getProps, { slots });

const tableMethods: TableMethods = {
  setProps,

  // useTableData
  reQuery,
  getRequestParams,

  // useTableRadioSelection
  setRadioSelectedRow,
  getRadioSelectedRow,
  clearRadioSelectedRow,

  // useTableSelection
  getSelectedRows,
  getSelectedIds,
  checkHasSelection,
  validateHasSelection,
};

onMounted(() => {
  emit("register", tableMethods);
});

defineExpose({
  ...tableMethods,
});
</script>

<style lang="scss">
@import "./style.scss";
</style>
