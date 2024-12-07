import type { BasicTableProps } from "../types";
import type { Page } from "@center/components/basic-pagination";

import { ref, computed, unref } from "vue";
import { merge } from "lodash";

type Props = PickPartial<BasicTableProps, "paginationProps">;

export type UseTablePaginationReturn = ReturnType<typeof useTablePagination>;

export function useTablePagination(props: Props) {
  const getPaginationProps = computed(() => {
    return merge({}, props.paginationProps);
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
}
