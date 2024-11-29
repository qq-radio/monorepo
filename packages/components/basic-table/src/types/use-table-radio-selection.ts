import type { BasicTableProps } from "./";
import type { ComputedRef } from "vue";

export interface UseTableRadioSelectionReturn {
  getRadioSelectedRow: () => Recordable;
  clearRadioSelectedRow: () => void;
  handleRadioSelectionChange: (rows: Recordable) => void;
}

export interface UseTableRadioSelection {
  (getProps: ComputedRef<BasicTableProps>): UseTableRadioSelectionReturn;
}
