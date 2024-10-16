export interface BasicCheckboxGroupProps {
  modelValue?: ModelValue;
  isButton?: boolean;

  options?: CheckboxOption[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;

  render?: Render;
}

export interface BasicCheckboxGroupEmits {
  (e: "update:modelValue", value: ModelValue): void;
  (
    e: "change",
    params: {
      value: ModelValue;
      options?: CheckboxOption[];
    }
  ): void;
}

export interface CheckboxOption {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  border?: boolean;
  size?: OptionSize;

  isButton?: boolean;
  customRender?: Render;
  customSlot?: string;
}

export type ModelValue = (string | number)[];

export interface CheckboxCallbackParams {
  value?: ModelValue;
  option: CheckboxOption;
}
