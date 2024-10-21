export interface BasicCascaderProps {
  modelValue?: ModelValue;
  clearable?: boolean;

  data?: Recordable[];
  api?: () => Promise<Recordable[]>;
}

export interface BasicCascaderEmits {
  (e: "update:modelValue", value: ModelValue): void;
  (
    e: "change",
    params: {
      value: ModelValue;
      node: Recordable | Recordable[];
    }
  ): void;
}

export type ModelValue = undefined | string | number | string[] | number[];
