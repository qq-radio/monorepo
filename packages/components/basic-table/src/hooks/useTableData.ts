import type { UseTableData, TableSchema } from "../types";

import { ref, computed, watch, unref, onMounted } from "vue";
import { isFunction, cloneDeep, isArray, merge } from "lodash";

export const useTableData: UseTableData = (getProps, context) => {
  const { searchParams, page, setPagination } = context;

  const isLoading = ref(false);
  const tableDatas = ref<Recordable[]>([]);

  const isCustomTableDatas = computed(() => isArray(getProps.value.data));

  const tableSchemas = computed(() => {
    return normalizeTableSchemas(getProps.value.schemas);
  });

  watch(
    () => getProps.value.data,
    (data) => {
      if (isCustomTableDatas.value) {
        tableDatas.value = data;
        setPagination({ total: data?.length });
      }
    },
    { immediate: true }
  );

  const getRequestParams = () => {
    const params = {
      ...getProps.value.extraParams,
      ...searchParams.value,
      currentPage: page.value.currentPage,
      pageSize: page.value.pageSize,
    };

    return isFunction(getProps.value.paramsFormatter)
      ? getProps.value.paramsFormatter(cloneDeep(params))
      : params;
  };

  const formatRecords = (records: Recordable[]) =>
    isFunction(getProps.value.dataFormatter)
      ? getProps.value.dataFormatter(records)
      : records;

  const query = async () => {
    try {
      if (!isFunction(getProps.value.request)) {
        return;
      }

      isLoading.value = true;

      const requestParams = getRequestParams();

      const response = await getProps.value.request(requestParams);
      const { total, records } = response || {};

      tableDatas.value = formatRecords(records);
      setPagination({ total });
    } catch (error: unknown) {
      console.log("BasicTable Error:", error);
    } finally {
      isLoading.value = false;
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
    tableDatas,
    isLoading,
    tableSchemas,
    getRequestParams,
    query,
    reQuery,
  };
};

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
