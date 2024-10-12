export type RadioValue = string | number | boolean | undefined;

export type RadioType = "radio" | "radio-button";

export interface SingleRadio {
  label?: string;
  value?: RadioValue;
  type?: RadioType;
  disabled?: boolean;

  customProps?: Recordable;
  customRender?: Recordable;
  customSlot?: Recordable;
}

export interface BasicRadioProps extends SingleRadio {
  modelValue?: RadioValue;
  options?: SingleRadio[];
  type?: RadioType;

  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;
}

export interface BasicRadioEmits {
  (e: "update:modelValue", value: RadioValue): void;
  (
    e: "change",
    params: {
      label: string | undefined;
      value: RadioValue;
      option?: SingleRadio;
    }
  ): void;
}

export interface RadioCallbackParams {
  label?: string;
  value?: RadioValue;
  option: SingleRadio;
}
