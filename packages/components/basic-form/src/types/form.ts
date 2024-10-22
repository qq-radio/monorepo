import type { FormMethods, FormItemCallbackParams } from "./";

import type { VNode, Component } from "vue";
import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule,
} from "element-plus";
import type { Mutable } from "element-plus/es/utils";

export type ElementPlusComponentType =
  | "input"
  | "input-number"
  | "textarea"
  | "checkbox"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "switch"
  | "rate"
  | "slider"
  | "color-picker";

export type CustomComponentType =
  | "sub-title"
  | "radio"
  | "checkbox-group"
  | "select"
  | "upload";

export type ComponentType = ElementPlusComponentType | CustomComponentType;

type TimeRangeMapFields = [string, string];

export type RenderType = string | VNode | Component;

export type CustomSlot = { [slotName: string]: (params?: any) => RenderType };

export type ComponentProps = {
  placeholder?: string;
  extraFields?: string[][];
  timeRangeMapFields?: TimeRangeMapFields;
} & Recordable;

export interface FormSchema {
  label: string;
  prop: string;
  defaultValue?: string | number;
  component?: ComponentType;
  componentProps?: ComponentProps;
  componentListeners?: (actions: Partial<FormMethods>) => Recordable;
  slot?: string;
  labelWidth?: string | number;

  sort?: number;
  colProps?: Partial<Mutable<ColProps>>;
  formItemProps?: Partial<Mutable<FormItemProps>>;

  required?: boolean;
  min?: number;
  max?: number;
  showLimitText?: boolean;
  noWhitespace?: number;
  rules?: FormItemRule[];

  hasLabel?: boolean;
  hidden?: boolean;
  vIf?: boolean | ((parmas: FormItemCallbackParams) => boolean);
  disabled?: boolean | ((parmas: FormItemCallbackParams) => boolean);
}

export interface BasicFormProps {
  modelValue?: Recordable;
  schemas?: FormSchema[];
  loading?: boolean;
  disabled?: boolean;

  rowProps?: Partial<Mutable<RowProps>>;
  colProps?: Partial<Mutable<ColProps>>;
  formItemProps?: Partial<Mutable<FormItemProps>>;

  hasLabel?: boolean;
  labelSuffix?: string;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";

  hasFooter?: boolean;
  hasReset?: boolean;
  resetText?: string;
  submitText?: string;
  footerAlign?: "left" | "right" | "center";

  hasErrorTip?: boolean;

  // interface data -> form model
  modelAdaptee?: (model: Recordable<any>) => Recordable<any>;
  // form model -> interface data
  modelAdapter?: (model: Recordable<any>) => Recordable<any>;

  // cardProps: Recordable;
  // cardSlots: Recordable;

  // customRender: any;
  // customSlot: any;

  // customLabelRender: any;
  // customLabelSlot: any;
}

export interface BasicFormEmits {
  (e: "register", methods: FormMethods): void;
  (e: "update:modelValue", values: Recordable): void;
  (e: "change", v: unknown, schemaItem: FormSchema): void;
  (e: "submit", values: Recordable): void;
  (e: "reset", values?: Recordable): void;
}
