export interface BasicSelectProps {
  modelValue?: SelectValue;
  hasCheckAll?: boolean;
  multiple?: boolean;
  clearable?: boolean;

  options?: SelectOption[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;
  formatter?: (option: any) => any;

  render?: () => RenderType;
}

export interface BasicSelectEmits {
  (e: "update:modelValue", value: SelectValue): void;
  (
    e: "change",
    params: {
      labels: string[];
      values: SelectValue;
      options: SelectOption[];
    }
  ): void;
}

export type SelectValue =
  | undefined
  | string
  | number
  | boolean
  | string[]
  | number[];

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;

  customRender?: () => RenderType;
  customSlot?: string;
}

export interface SelectCallbackParams {
  labels: string[];
  values: SelectValue;
  option: SelectOption;
}
