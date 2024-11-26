import type { BasicTableProps } from "./";
import type { TableColumnCtx } from "element-plus";

export type TableBodyProps = Pick<
  BasicTableProps,
  | "schemas"
  | "loading"
  | "rowKey"
  | "hasRadioSelection"
  | "radioSelectionColumnProps"
  | "hasSelection"
  | "selectionColumnProps"
  | "hasIndex"
  | "indexColumnProps"
  | "hasExpand"
  | "expandColumnProps"
  | "actionColumnProps"
  | "actionProps"
  | "actions"
> & {
  tableDatas: Array<Recordable>;
};

export interface TableColumnParams {
  row: Recordable<any>;
  rowIndex: number;
  column: TableColumnCtx<any>;
}
