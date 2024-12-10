<template>
  <div :class="ns.b()">
    <div :class="ns.e('search')">
      <BasicForm
        v-if="getSearchSchemas?.length"
        v-bind="getSearchProps"
        v-model="searchParams"
        :schemas="getSearchSchemas"
        :loading="isLoading"
        @submit="search"
        @reset="reset"
      >
        <template
          v-for="name in Object.keys(searchSlots)"
          :key="name"
          #[name]="scope"
        >
          <slot :name="name" v-bind="scope" />
        </template>
      </BasicForm>
      <div>
        <slot name="operation-before" />
        <BasicButtonGroup :buttons="getProps.operations" @success="reQuery" />
        <slot name="operation-after" />
      </div>
    </div>
    <div :class="ns.e('body')">
      <el-table
        v-loading="isLoading"
        v-bind="getBindValues"
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

            <template v-for="schema in getTableSchemas" :key="schema.prop">
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
import { useTableColumnProps } from "./hooks/useTableColumnProps";
import { useTableSlots } from "./hooks/useTableSlots";
import { useTableRadioSelection } from "./hooks/useTableRadioSelection";
import { useTableSelection } from "./hooks/useTableSelection";
import { useTablePagination } from "./hooks/useTablePagination";

import { useAttrs, useSlots, ref, computed, unref, onMounted } from "vue";
import { pick, merge } from "lodash";

import { BasicForm } from "@center/components/basic-form";
import { BasicButtonGroup } from "@center/components/basic-button-group";
import { BasicPagination } from "@center/components/basic-pagination";
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
  immediate: true,
  loading: false,
});

const propsRef = ref<Partial<BasicTableProps>>();

const getProps = computed<BasicTableProps>(() => {
  return merge(props, unref(propsRef));
});

function setProps(partialProps: Partial<BasicTableProps>) {
  propsRef.value = merge(unref(propsRef), partialProps);
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
  rowKey: getProps.value.rowKey || "id",
}));

const { getSearchProps, getSearchSchemas, searchParams } = useTableSearch(
  computed(() =>
    pick(getProps.value, ["searchProps", "searchSchemas", "schemas"])
  ),
  { emit }
);

const { getPaginationProps, page, setPagination } = useTablePagination(
  pick(getProps.value, "paginationProps"),
  { emit }
);

const {
  isLoading,
  tableDatas,
  getTableSchemas,
  query,
  reQuery,
  getRequestParams,
} = useTableData(
  computed(() =>
    pick(getProps.value, [
      "schemas",
      "request",
      "extraParams",
      "paramsFormatter",
      "immediate",
      "data",
      "dataFormatter",
    ])
  ),
  { searchParams, page, setPagination, emit }
);

const {
  getRadioSelectionColumnProps,
  getSelectionColumnProps,
  getIndexColumnProps,
  getExpandColumnProps,
  getActionColumnProps,
  getActionProps,
} = useTableColumnProps(
  pick(getProps.value, [
    "radioSelectionColumnProps",
    "selectionColumnProps",
    "indexColumnProps",
    "expandColumnProps",
    "actionColumnProps",
    "actionProps",
  ])
);

const { searchSlots, tableHeaderSlots, tableCellSlots } = useTableSlots(
  computed(() => ({
    searchSchemas: getSearchSchemas.value,
    tableSchemas: getTableSchemas.value,
  })),
  {
    slots,
  }
);

const {
  radioSelectedValue,
  handleRadioSelectionChange,
  setRadioSelectedRow,
  getRadioSelectedRow,
  clearRadioSelectedRow,
} = useTableRadioSelection({
  rowKey: getBindValues.value.rowKey,
  hasRadioSelection: getProps.value.hasRadioSelection,
});

const {
  handleSelectionChange,
  getSelectedRows,
  getSelectedIds,
  checkHasSelection,
  validateHasSelection,
} = useTableSelection();

const search = () => {
  reQuery();
  emit("search", getRequestParams());
};

const reset = () => {
  reQuery();
  emit("reset", getRequestParams());
};

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
