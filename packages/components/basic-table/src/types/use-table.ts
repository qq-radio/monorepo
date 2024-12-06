import type { UseTableDataReturn } from "../hooks/useTableData";
import type { UseTableRadioSelectionReturn } from "../hooks/useTableRadioSelection";

import type { BasicTableProps, UseTableSelectionReturn } from "./";

export interface TableMethods
  extends Pick<UseTableDataReturn, "reQuery" | "getRequestParams">,
    Pick<
      UseTableSelectionReturn,
      | "getSelectedRows"
      | "getSelectedIds"
      | "checkHasSelection"
      | "validateHasSelection"
    >,
    Pick<
      UseTableRadioSelectionReturn,
      "setRadioSelectedRow" | "getRadioSelectedRow" | "clearRadioSelectedRow"
    > {
  setProps: (props: Partial<BasicTableProps>) => void;
}

type UseTableReturn = [(instance: TableMethods) => void, TableMethods];

export interface UseTable {
  (props?: Partial<BasicTableProps>): UseTableReturn;
}
