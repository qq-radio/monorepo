export interface BasicCascaderProps {
  modelValue?: CascaderModelValue;
  clearable?: boolean;

  data?: Recordable[];
  api?: () => Promise<any>;
  resultField?: string;
}

export interface BasicCascaderEmits {
  (e: "update:modelValue", value: CascaderModelValue): void;
  (
    e: "change",
    params: {
      value: CascaderModelValue;
      node: Recordable | Recordable[];
    }
  ): void;
}

export type CascaderModelValue =
  | undefined
  | string
  | number
  | string[]
  | number[];
