import type { BasicTableProps, BasicTableEmits, TableSchema } from "../types";
import type { Page } from "@center/components/basic-pagination";
import type { ComputedRef, Ref } from "vue";

import { ref, computed, watch, unref, onMounted } from "vue";
import { isFunction, cloneDeep, isArray, merge } from "lodash";

type Props = ComputedRef<
  Pick<
    BasicTableProps,
    | "schemas"
    | "request"
    | "extraParams"
    | "paramsFormatter"
    | "immediate"
    | "data"
    | "dataFormatter"
  >
>;

type Context = {
  formParams: Ref<Recordable>;
  page: Ref<Page>;
  setPagination: (p: Partial<Page>) => void;
  emit: BasicTableEmits;
};

export type UseTableDataReturn = ReturnType<typeof useTableData>;

export function useTableData(getProps: Props, context: Context) {
  const { formParams, page, setPagination, emit } = context;

  const isLoading = ref(false);

  const tableDatas = ref<Recordable[]>([]);

  const getTableSchemas: ComputedRef<TableSchema[]> = computed(() => {
    const { schemas } = getProps.value;
    return isArray(schemas) ? normalizeTableSchemas(schemas) : [];
  });

  watch(
    () => getProps.value.data,
    (data) => {
      if (isArray(data)) {
        tableDatas.value = data;
        setPagination({ total: data.length });
      }
    },
    { immediate: true }
  );

  const getRequestParams = (): Recordable => {
    const { extraParams = {}, paramsFormatter } = getProps.value;

    const params = {
      ...extraParams,
      ...formParams.value,
      currentPage: page.value.currentPage,
      pageSize: page.value.pageSize,
    };

    const finalParams = isFunction(paramsFormatter)
      ? paramsFormatter(params)
      : params;

    return cloneDeep(finalParams);
  };

  const formatRecords = (records: Recordable[]) => {
    const { dataFormatter } = getProps.value;
    return isFunction(dataFormatter) ? dataFormatter(records) : records;
  };

  const query = async () => {
    const { request } = getProps.value;

    try {
      if (!isFunction(request)) {
        return;
      }

      isLoading.value = true;

      const requestParams = getRequestParams();

      const response = await request(requestParams);
      const { records, total } = response || {};

      tableDatas.value = formatRecords(records);
      setPagination({ total });
      emit("request-success", tableDatas.value);
    } catch (error: unknown) {
      console.log("BasicTable Error:", error);
      emit("request-error", error);
    } finally {
      isLoading.value = false;
      emit("request-complete", tableDatas.value);
    }
  };

  const reQuery = () => {
    setPagination({ currentPage: 1 });
    query();
  };

  onMounted(() => {
    setTimeout(() => {
      if (getProps.value.immediate) {
        query();
      }
    });
  });

  return {
    isLoading,
    tableDatas,
    getTableSchemas,
    getRequestParams,
    query,
    reQuery,
  };
}

function filterSchemas(schemas: TableSchema[]) {
  return schemas.filter((item) => unref(item.visible) !== false);
}

function addColumnMinWidth(schemaItem: TableSchema) {
  return merge(
    {
      minWidth: schemaItem.width,
    },
    schemaItem
  );
}

function normalizeTableSchemas(schemas: TableSchema[]) {
  return filterSchemas(schemas).map(addColumnMinWidth);
}
