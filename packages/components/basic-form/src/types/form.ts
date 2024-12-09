import type {
  FormItemCallbackParams,
  FormItemComponentPropsCallbackParams,
} from "./";
import type { UseFormSelfReturn } from "../hooks/useFormSelf";
import type { UseFormEventReturn } from "../hooks/useFormEvent";

import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule,
} from "element-plus";
import type { Mutable } from "element-plus/es/utils";
import type { MaybeRefOrGetter } from "vue";

export interface BasicFormProps {
  modelValue?: Recordable;
  schemas?: FormSchema[];
  loading?: boolean;
  disabled?: MaybeRefOrGetter<boolean>;

  rowProps?: Partial<Mutable<RowProps>>;
  colProps?: Partial<Mutable<ColProps>>;
  titleColProps?: Partial<Mutable<ColProps>>;
  buttonColProps?: Partial<Mutable<ColProps>>;
  itemProps?: Partial<Mutable<FormItemProps>>;

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
  modelAdaptee?: (model: Recordable) => Recordable;
  // form model -> interface data
  modelAdapter?: (model: Recordable) => Recordable;
}

export interface BasicFormEmits {
  (e: "register", methods: FormMethods): void;
  (e: "update:modelValue", values: Recordable): void;
  (e: "submit-error", values: Recordable): void;
  (e: "submit", values: Recordable): void;
  (e: "reset", values?: Recordable): void;
}

export interface FormSchema {
  title?: string;
  customTitleRender?: (params: FormItemCallbackParams) => RenderType;
  customTitleSlot?: string;
  titleTooltip?: string;
  titleProps?: Recordable;

  // 表单项
  prop?: string;
  label?: string;
  defaultValue?: string | number | boolean;
  hasLabel?: boolean;
  labelWidth?: string | number;
  sort?: number;
  visible?: boolean | ((parmas: FormItemCallbackParams) => boolean);
  disabled?: boolean | ((parmas: FormItemCallbackParams) => boolean);
  colProps?: Partial<Mutable<ColProps>>;
  titleColProps?: Partial<Mutable<ColProps>>;
  itemProps?: Partial<Mutable<FormItemProps>>;

  // 表单项 - label
  customLabelRender?: (params: FormItemCallbackParams) => RenderType;
  customLabelSlot?: string;
  labelTooltip?: string;

  // 表单项 - field
  component?: ComponentType;
  componentProps?:
    | ComponentProps
    | ((parmas: FormItemComponentPropsCallbackParams) => ComponentProps);
  componentSlots?: Recordable;
  componentListeners?: (actions: Partial<FormMethods>) => Recordable;

  customRender?: (params: FormItemCallbackParams) => RenderType;
  customSlot?: string;

  // 表单项 - rules
  required?: boolean;
  min?: number;
  max?: number;

  noWhitespace?: boolean;
  rules?: FormItemRule[];
}

export interface FormMethods
  extends UseFormSelfReturn,
    Omit<UseFormEventReturn, "formSchemas" | "formModel" | "emitUpdateModel"> {
  setProps: (props: Partial<BasicFormProps>) => void;
  submit: () => Promise<unknown>;
  reset: () => void;
}

export type ElementPlusComponentType =
  | "input"
  | "input-number"
  | "textarea"
  | "checkbox"
  | "date-picker"
  | "time-picker"
  | "switch"
  | "rate"
  | "slider"
  | "color-picker";

export type CustomComponentType =
  | "radio-group"
  | "checkbox-group"
  | "select"
  | "tree-select"
  | "cascader"
  | "upload";

export type ComponentType = ElementPlusComponentType | CustomComponentType;

type TimeRangeMapFields = [string, string];

export type ComponentProps = {
  placeholder?: string;
  extraFields?: string[][];
  timeRangeMapFields?: TimeRangeMapFields;
  type?: string;
} & Recordable;

export type EnhancedFormSchema = Omit<
  FormSchema,
  "component" | "componentProps"
> & {
  component: ComponentType;
  componentProps: ComponentProps;
};
