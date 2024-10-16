export type RadioValue = string | number | boolean | undefined;

export type RadioSize = "large" | "default" | "small";

export interface CheckboxOption {
  label?: string;
  value?: RadioValue;
  disabled?: boolean;
  border?: boolean;
  size?: RadioSize;

  isButton?: boolean;
  customRender?: Render;
  customSlot?: string;
}

export interface BasicCheckboxGroupProps {
  modelValue?: RadioValue;
  isButton?: boolean;

  options?: CheckboxOption[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;

  render?: Render;
}

export interface BasicCheckboxGroupEmits {
  (e: "update:modelValue", value: RadioValue): void;
  (
    e: "change",
    params: {
      label: string | undefined;
      value: RadioValue;
      option?: CheckboxOption;
    }
  ): void;
}

export interface RadioCallbackParams {
  label?: string;
  value?: RadioValue;
  option: CheckboxOption;
}
