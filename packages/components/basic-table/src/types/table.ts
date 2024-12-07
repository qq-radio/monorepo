import type { TableHeaderCallbackParams, TableCellCallbackParams } from "./";
import type {
  BasicFormProps,
  FormSchema,
} from "@center/components/basic-form/src/types";
import type {
  BasicButtonGroupProps,
  Button,
} from "@center/components/basic-button-group";
import { DisplayType } from "@center/components/basic-display";
import type { Page } from "@center/components/basic-pagination";

import type { UseTableDataReturn } from "../hooks/useTableData";
import type { UseTableSelectionReturn } from "../hooks/useTableSelection";
import type { UseTableRadioSelectionReturn } from "../hooks/useTableRadioSelection";

import type { ComputedRef } from "vue";
import type { PaginationProps, TableColumnCtx } from "element-plus";

export interface BasicTableProps {
  schemas: TableSchema[];
  searchSchemas?: FormSchema[];
  data?: Array<Recordable>;
  request?: (params: Recordable) => Promise<{
    records: Array<Recordable>;
    total: number;
  }>;
  extraParams?: Recordable;
  paramsFormatter?: (params: Recordable) => Recordable;
  dataFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>;
  rowKey?: string;
  immediate?: boolean;
  loading?: boolean;
  ellipsis?: boolean;

  searchProps?: Partial<BasicFormProps>;
  paginationProps?: Partial<PaginationProps>;

  operationProps?: Pick<
    BasicButtonGroupProps,
    "confirmType" | "showNumber" | "callbackParams" | "buttonProps"
  >;
  operations?: Button[];

  hasRadioSelection?: boolean;
  radioSelectionColumnProps?: Partial<TableColumnCtx<any>>;

  hasSelection?: boolean;
  selectionColumnProps?: Partial<TableColumnCtx<any>>;

  hasIndex?: boolean;
  indexColumnProps?: Partial<TableColumnCtx<any>>;

  hasExpand?: boolean;
  expandColumnProps?: Partial<TableColumnCtx<any>>;

  actionColumnProps?: Partial<TableColumnCtx<any>>;
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

export interface TableSchema {
  prop?: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: "left" | "right" | boolean;
  visible?: boolean | ComputedRef<boolean>;
  formatter?: (params: TableCellCallbackParams) => any;

  searchable?: boolean;
  searchConfig?: FormSchema;

  columnProps?: Partial<TableColumnCtx<any>>;
  columnSlots?: Recordable;

  headerTooltip?: string;
  customHeaderRender?: (params: TableHeaderCallbackParams) => RenderType;
  customHeaderSlot?: string;

  customRender?: (params: TableCellCallbackParams) => RenderType;
  customSlot?: string;
  display?: DisplayType;
  displayProps?: Recordable;
  displaySlots?: Recordable;
}

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
