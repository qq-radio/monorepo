import type { TableSchema } from "./";
import type { TableColumnCtx } from "element-plus";

export interface TableHeaderProps {
  rowIndex: number;
  column: TableColumnCtx<any>;
  schema: TableSchema;
}

export interface TableHeaderCallbackParams extends TableHeaderProps {}
