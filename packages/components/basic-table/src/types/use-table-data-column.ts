import type { TableBodyProps } from "./";
import type { ComputedRef, Slots } from "vue";

export interface UseTableDataColumnReturn {
  tableHeaderSlots: ComputedRef<Slots>;
  tableCellSlots: ComputedRef<Slots>;
}

export interface UseTableDataColumn {
  (
    getProps: ComputedRef<TableBodyProps>,
    context: {
      slots: Slots;
    }
  ): UseTableDataColumnReturn;
}
