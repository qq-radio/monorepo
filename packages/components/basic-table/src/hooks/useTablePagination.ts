import type { UseTablePagination } from "../types";
import type { Page } from "@center/components/basic-pagination";

import { ref, computed, unref } from "vue";
import { merge } from "lodash";

export const useTablePagination: UseTablePagination = (getProps) => {
  const { paginationProps } = getProps.value;

  const getPaginationProps = computed(() => {
    return merge({}, paginationProps);
  });

  const page = ref<Page>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  function setPagination(p: Partial<Page>) {
    page.value = merge(unref(page), p);
  }

  return {
    page,
    getPaginationProps,
    setPagination,
  };
};
