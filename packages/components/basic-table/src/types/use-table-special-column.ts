import type { TableBodyProps } from "./";
import type { BasicButtonGroupProps } from "@center/components/basic-button";
import type { ComputedRef, Ref } from "vue";
import type { TableColumnCtx } from "element-plus";

export interface UseTableSpecialColumnReturn {
  getRadioSelectionColumnProps?: ComputedRef<Partial<TableColumnCtx<any>>>;
  getSelectionColumnProps?: ComputedRef<Partial<TableColumnCtx<any>>>;
  getIndexColumnProps?: ComputedRef<Partial<TableColumnCtx<any>>>;
  getExpandColumnProps?: ComputedRef<Partial<TableColumnCtx<any>>>;
  getActionColumnProps?: ComputedRef<Partial<TableColumnCtx<any>>>;
  getActionProps?: ComputedRef<Partial<BasicButtonGroupProps>>;
}

export interface UseTableSpecialColumn {
  (getProps: ComputedRef<TableBodyProps>): UseTableSpecialColumnReturn;
}
