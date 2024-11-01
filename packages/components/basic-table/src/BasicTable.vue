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
      <TableBody
        v-bind="getBindValues"
        :schemas="tableSchemas"
        :tableDatas="tableDatas"
        :loading="isLoading"
        @selection-change="handleSelectionChange"
        @row-click="handleRadioSelectionChange"
      >
        <template
          v-for="slotName in Object.keys(slots)"
          :key="slotName"
          #[slotName]="scope"
        >
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableBody>
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

<script lang="ts" setup>
import type { BasicTableProps, BasicTableEmits, TableMethods } from "./types";

import { useBasicNamespace } from "@center/composables";

import { useTableSearch } from "./hooks/useTableSearch";
import { useTablePagination } from "./hooks/useTablePagination";
import { useTableData } from "./hooks/useTableData";
import { useTableSelection } from "./hooks/useTableSelection";
import { useTableRadioSelection } from "./hooks/useTableRadioSelection";

import { useAttrs, useSlots, ref, computed, unref, onMounted } from "vue";

import { BasicPagination } from "@center/components/basic-pagination";
import { BasicForm } from "@center/components/basic-form";
import { BasicButtonGroup } from "@center/components/basic-button";
import TableBody from "./components/TableBody.vue";

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
});

const propsRef = ref<Partial<BasicTableProps>>();

const getProps = computed<BasicTableProps>(() => {
  return { ...props, ...unref(propsRef) };
});

function setProps(partialProps: Partial<BasicTableProps>) {
  propsRef.value = { ...unref(propsRef), ...partialProps };
}

const getBindValues = computed(() => ({
  ...attrs,
  ...getProps.value,
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
  getSelectedRows,
  getSelectedIds,
  checkHasSelection,
  handleSelectionChange,
  validateHasSelection,
} = useTableSelection(getProps, { slots });

const {
  getRadioSelectedRow,
  handleRadioSelectionChange,
  cleanRadioSelectedRow,
} = useTableRadioSelection(getProps);

const tableMethods: TableMethods = {
  setProps,

  // useTableData
  reQuery,
  getRequestParams,

  // useTableSelection
  getSelectedRows,
  getSelectedIds,
  checkHasSelection,
  validateHasSelection,

  // useTableRadioSelection
  cleanRadioSelectedRow,
  getRadioSelectedRow,
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
