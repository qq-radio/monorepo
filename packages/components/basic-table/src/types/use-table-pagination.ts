import type { BasicTableProps } from "./";
import type { Page } from "@center/components/basic-pagination";
import type { ComputedRef, Ref } from "vue";

export interface UseTablePaginationReturn {
  page: Ref<Page>;
  getPaginationProps: ComputedRef<Recordable>;
  setPagination: (p: Partial<Page>) => void;
}

export interface UseTablePagination {
  (getProps: ComputedRef<BasicTableProps>): UseTablePaginationReturn;
}
