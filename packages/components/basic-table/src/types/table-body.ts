import type { BasicTableProps } from "./";
import type { TableColumnCtx } from "element-plus";

export type TableBodyProps = Pick<
  BasicTableProps,
  | "schemas"
  | "datas"
  | "loading"
  | "hasRadioSelection"
  | "radioSelectionKey"
  | "hasSelection"
  | "selectionColumnProps"
  | "hasIndex"
  | "indexColumnProps"
  | "hasExpand"
  | "expandColumnProps"
  | "hasAction"
  | "actionColumnProps"
  | "actionProps"
  | "actions"
>;

export interface TableColumnParams {
  row: Recordable<any>;
  rowIndex: number;
  column: TableColumnCtx<any>;
}