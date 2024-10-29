import type { TableColumnParams } from "./";
import type { ButtonProps, LinkProps } from "element-plus";
import type { VNode } from "vue";

export interface TableActionProps extends TableColumnParams {
  type?: "button" | "link";
  confirmType?: "message-box" | "pop-confirm";
  showNumber?: number;
  buttons: ActionButton[];
}

export interface TableActionCallbackParams extends TableColumnParams {
  button: ActionButton;
}

export interface RenderButton {
  (params: TableActionCallbackParams): VNode;
}

export interface ActionButton {
  text: string | ((params: TableActionCallbackParams) => string);
  permission?: string;
  show?: boolean | ((params: TableColumnParams) => boolean);
  message?: string;
  props?: Partial<ButtonProps & LinkProps>;
  onClick?: (params: TableActionCallbackParams) => void;
  onConfirm?: (params: TableActionCallbackParams) => void;
  onCancel?: (params: TableActionCallbackParams) => void;
}
