import type { BasicTableProps, TableSchema } from "./";
import type { ComputedRef, Ref } from "vue";
import type { Page } from "@center/components/basic-pagination";

export interface UseTableDataReturn {
  isLoading: Ref<boolean>;
  tableDatas: Ref<Recordable[]>;
  tableSchemas: ComputedRef<TableSchema[]>;
  getRequestParams: () => Recordable;
  query: () => Promise<void>;
  reQuery: () => void;
}

export interface UseTableData {
  (
    getProps: ComputedRef<BasicTableProps>,
    context: {
      searchParams: Ref<Recordable>;
      page: Ref<Page>;
      setPagination: (page: Partial<Page>) => void;
    }
  ): UseTableDataReturn;
}
