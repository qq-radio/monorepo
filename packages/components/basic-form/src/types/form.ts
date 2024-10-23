import type { FormMethods, FormItemCallbackParams } from "./";

import type { VNode, Component, Slots } from "vue";
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
  | "title"
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

export type Render = () => string | VNode;

export interface FormGroup {
  title: string;
  customTitleRender?: Render;
  customTitleSlot?: string;
}

export interface FormSchema {
  // 改动太大了  类型几乎都要改，所以先不改，用最简单的加个title 全部partial
  title?: string;
  customTitleRender?: Render;
  customTitleSlot?: string;
  titleTooltip?: string;

  // 跟form-item相关
  label?: string;
  prop?: string;
  defaultValue?: string | number;
  hasLabel?: boolean;
  labelWidth?: string | number;
  sort?: number;
  hidden?: boolean | ((parmas: FormItemCallbackParams) => boolean);
  disabled?: boolean | ((parmas: FormItemCallbackParams) => boolean);
  colProps?: Partial<Mutable<ColProps>>;
  formItemProps?: Partial<Mutable<FormItemProps>>;

  // 自定义渲染 - label
  customLabelRender?: Render;
  customLabelSlot?: string;
  labelTooltip?: string;

  // 自定义渲染 - field
  component?: ComponentType;
  componentProps?: ComponentProps;
  componentSlots?: Slots;
  componentListeners?: (actions: Partial<FormMethods>) => Recordable;

  customRender?: Render;
  customSlot?: string;

  // 这些都是rules了
  required?: boolean;
  min?: number;
  max?: number;

  noWhitespace?: boolean;
  rules?: FormItemRule[];
}

// export type FormSchema = FormSchemaItem | FormGroup;

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

  hasErrorMessageTip?: boolean;

  // interface data -> form model
  modelAdaptee?: (model: Recordable<any>) => Recordable<any>;
  // form model -> interface data
  modelAdapter?: (model: Recordable<any>) => Recordable<any>;
}

export interface BasicFormEmits {
  (e: "register", methods: FormMethods): void;
  (e: "update:modelValue", values: Recordable): void;
  (e: "change", v: unknown, schemaItem: FormSchema): void;
  (e: "submit", values: Recordable): void;
  (e: "reset", values?: Recordable): void;
}
