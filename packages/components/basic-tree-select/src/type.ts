export interface BasicTreeSelectProps {
  modelValue?: ModelValue;
  clearable?: boolean;

  data?: Recordable[];
  api?: () => Promise<Recordable[]>;
}

export interface BasicTreeSelectEmits {
  (e: "update:modelValue", value: ModelValue): void;
  (
    e: "change",
    params: {
      value: ModelValue;
      // node: Recordable[];
    }
  ): void;
}

export type ModelValue = string | number | boolean | object;
