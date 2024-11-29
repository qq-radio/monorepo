import type { TableBodyProps } from "./";
import type { ShallowRef, Slots } from "vue";

export interface UseTableDataColumnReturn {
  tableHeaderSlots: ShallowRef<Slots>;
  tableCellSlots: ShallowRef<Slots>;
}

export interface UseTableDataColumn {
  (
    getProps: ShallowRef<TableBodyProps>,
    context: {
      slots: Slots;
    }
  ): UseTableDataColumnReturn;
}
