import type { UseTableData } from "../types";

import { ref, computed, onMounted } from "vue";
import { isFunction, cloneDeep, merge } from "lodash";

import { normalizeTableSchemas } from "../tools/normalize-schema";

export const useTableData: UseTableData = (getProps, context) => {
  const { searchParams, page, setPagination } = context;

  const isLoading = ref(false);
  const tableDatas = ref<Recordable[]>([]);

  const getTableProps = computed(() => {
    return merge({}, getProps.value.tableProps);
  });

  const tableSchemas = computed(() => {
    return normalizeTableSchemas(getProps.value.schemas);
  });

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
      if (getProps.value.immediate || isFunction(getProps.value.request)) {
        query();
      }
    });
  });

  return {
    tableDatas,
    isLoading,
    getTableProps,
    tableSchemas,
    getRequestParams,
    query,
    reQuery,
  };
};
