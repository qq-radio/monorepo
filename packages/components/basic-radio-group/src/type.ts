export interface BasicRadioGroupProps {
  modelValue?: RadioValue;
  isButton?: boolean;

  options?: RadioOption[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;
  formatter?: (option: any) => any;

  render?: Render;
}

export interface BasicRadioGroupEmits {
  (e: "update:modelValue", value: RadioValue): void;
  (
    e: "change",
    params: {
      label: string;
      value: RadioValue;
      option: RadioOption;
    }
  ): void;
}

export type RadioValue = undefined | string | number;

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  border?: boolean;
  size?: OptionSize;

  isButton?: boolean;
  customRender?: Render;
  customSlot?: string;
}

export interface RadioCallbackParams {
  label: string;
  value: RadioValue;
  option: RadioOption;
}
