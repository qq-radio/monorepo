import type {
  TableColumnCallbackParams,
  TableMethods,
  TableActionProps,
  ActionButton,
  OperationButton,
} from "./";
import type {
  BasicFormProps,
  FormSchema,
} from "@center/components/basic-form/src/types";
import { DisplayType } from "@center/components/basic-display";
import type { Page } from "@center/components/basic-pagination";

import type { TableProps, PaginationProps } from "element-plus";
import type { VNode } from "vue";

export interface BasicTableProps {
  schemas: TableSchema[];
  datas?: Recordable[];
  tableDatas?: Array<Recordable>;
  request?: (params: Recordable) => Promise<{
    records: Array<Recordable>;
    total: number;
  }>;
  extraParams?: Recordable;
  paramsFormatter?: (params: Recordable) => Recordable;
  dataFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>;
  immediate?: boolean;
  loading?: boolean;
  ellipsis?: boolean;

  searchProps?: Partial<BasicFormProps>;
  tableProps?: Partial<TableProps<unknown>> & { columnWidth: number };
  paginationProps?: Partial<PaginationProps>;

  hasRadioSelection?: boolean;
  radioSelectionKey?: string;

  hasSelection?: boolean;
  selectionColumnProps?: Recordable;
  selectionValue?: string[] | number[];

  hasIndex?: boolean;
  indexColumnProps?: Recordable;

  hasExpand?: boolean;
  expandColumnProps?: Recordable;

  hasAction?: boolean;
  actionColumnProps?: Partial<TableActionProps>;
  actions?: ActionButton[];

  operations?: OperationButton[];
}

export interface BasicTableEmits {
  (e: "register", methods: TableMethods): void;
  (e: "search", params: Recordable): void;
  (e: "reset", params: Recordable): void;
  (e: "pagination-change", page: Page): void;
  (e: "request-error", error: unknown): void;
  (e: "request-complete", tableDatas: Array<Recordable>): void;
}

export type RenderType = string | VNode;

export interface TableSchema {
  prop?: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: "left" | "right" | boolean;
  visible?: boolean;
  tooltip?: string;
  formatter?: (params: TableColumnCallbackParams) => any;

  searchable?: boolean;
  searchConfig?: FormSchema;

  columnProps?: Recordable;
  columnSlots?: Recordable;

  renderHeader?: (label: string, props: TableSchema) => RenderType;
  slotHeader?: string;

  render?: (
    value: any,
    data: { row: Recordable; column: TableSchema; index: number }
  ) => RenderType;
  slot?: string;
  display?: DisplayType;
  displayProps?: Recordable;
}
