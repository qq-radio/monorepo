export type RadioValue = string | number;

export type RadioSize = "large" | "default" | "small";

export interface RadioOption {
  label?: string;
  value?: RadioValue;
  disabled?: boolean;
  border?: boolean;
  size?: RadioSize;

  isButton?: boolean;
  customRender?: Render;
  customSlot?: string;
}

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
      label: string | undefined;
      value: RadioValue;
      option?: RadioOption;
    }
  ): void;
}

export interface RadioCallbackParams {
  label?: string;
  value?: RadioValue;
  option: RadioOption;
}
