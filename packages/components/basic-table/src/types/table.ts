import type { TableCellCallbackParams, TableMethods } from "./";
import type {
  BasicButtonGroupProps,
  Button,
} from "@center/components/basic-button";

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
  tableProps?: Partial<TableProps<unknown>>;
  paginationProps?: Partial<PaginationProps>;

  operationProps?: Pick<
    BasicButtonGroupProps,
    "confirmType" | "showNumber" | "callbackParams" | "buttonProps"
  >;
  operations?: Button[];

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
  actionColumnProps?: Pick<
    TableSchema,
    "label" | "width" | "minWidth" | "fixed"
  >;
  actionProps?: Pick<
    BasicButtonGroupProps,
    "confirmType" | "showNumber" | "callbackParams" | "buttonProps"
  >;
  actions?: Button[];
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
  formatter?: (params: TableCellCallbackParams) => any;

  searchable?: boolean;
  searchConfig?: FormSchema;

  columnProps?: Recordable;
  columnSlots?: Recordable;

  customHeaderRender?: (label: string, props: TableSchema) => RenderType;
  customHeaderSlot?: string;

  customRender?: (
    value: any,
    data: { row: Recordable; column: TableSchema; index: number }
  ) => RenderType;
  customSlot?: string;
  display?: DisplayType;
  displayProps?: Recordable;
}
