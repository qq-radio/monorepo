import type { ButtonProps } from "element-plus";
import type { VNode } from "vue";

export type ConfirmType = "message-box" | "pop-confirm";

export interface BasicButtonGroupProps<T = Recordable> {
  confirmType?: ConfirmType;
  showNumber?: number;
  callbackParams?: T;
  buttonProps?: Recordable;
  buttons: Button<T>[];
}

type FF<T> = {
  [K in keyof T]: T[K];
};

export type ButtonCallbackParams<T = Recordable<string>> = {
  button?: Button<T>;
} & FF<T>;

export interface RenderButton {
  (params: ButtonCallbackParams): VNode;
}

export interface Button<T = Recordable> {
  text: string | ((params: ButtonCallbackParams<T>) => string);
  permission?: string;
  show?: boolean | ((params: ButtonCallbackParams<T>) => boolean);
  message?: string;
  props?: Partial<ButtonProps>;
  onClick?: (params: ButtonCallbackParams<T>) => void;
  onConfirm?: (params: ButtonCallbackParams<T>) => void;
  onCancel?: (params: ButtonCallbackParams<T>) => void;
}
