export interface BasicSelectProps {
  modelValue?: ModelValue;
  hasCheckAll?: boolean;
  multiple?: boolean;
  clearable?: boolean;

  options?: SelectOption[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;
  formatter?: (option: any) => any;

  render?: Render;
}

export interface BasicSelectEmits {
  (e: "update:modelValue", value: ModelValue): void;
  (
    e: "change",
    params: {
      value: ModelValue;
      label: string[];
      options: SelectOption[];
    }
  ): void;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;

  customRender?: Render;
  customSlot?: string;
}

export type ModelValue = string | number | boolean | string[] | number[];

export interface SelectCallbackParams {
  value?: ModelValue;
  option: SelectOption;
}
