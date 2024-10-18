import type { Ref, UnwrapRef } from "vue";

import { ref } from "vue";
import {
  isArray,
  isFunction,
  getValue,
  mapObjectArrayFields,
} from "@center/utils";

export type Value = string | number;

export interface Option {
  label: string;
  value: Value;
}

export function useOptionQuery<T extends Option>(props: {
  options?: Recordable[];
  api?: () => Promise<any>;
  resultField?: string;
  labelField?: string;
  valueField?: string;
  formatter?: (option: any) => any;
}): {
  options: Ref<UnwrapRef<T[]> | T[]>;
  init: () => void;
  findLabel: (value: Value) => string | undefined;
  findOptions: (values: Value[]) => Option[];
  findLabels: (values?: Value[]) => string[];
  findValues: (values?: string[]) => Value[];
} {
  const options = ref<T[]>([]);

  const init = async () => {
    try {
      if (isArray(props.options)) {
        options.value = handleOptions(props.options);
        return;
      }

      if (isFunction(props.api)) {
        const result = await props.api();
        options.value = handleOptions(result);
      }
    } catch (error) {
      console.error("UseOptionQuery init error:", error);
    }
  };

  const handleOptions = (result: unknown) => {
    const { resultField, labelField, valueField, formatter } = props;

    let list = resultField ? getValue(result, resultField) : result;

    if (!isArray(list)) {
      return [];
    }

    if (labelField && valueField) {
      list = mapObjectArrayFields(list, {
        label: labelField,
        value: valueField,
      });
    }

    if (isFunction(formatter)) {
      list = list.map(formatter);
      console.log("list 这里执行了吗？？？、:", list);
    }

    return list;
  };

  const findLabel = (value: Value) =>
    options.value.find((s) => s.value === value)?.label;

  const findOptions = (values: Value[]) => {
    return options.value.filter((option) =>
      values.includes(option.value || "")
    );
  };

  const findLabels = (values?: Value[]) => {
    return values?.length
      ? options.value
          .filter((option) => values.includes(option.value || ""))
          .map((i) => i.label)
      : [];
  };

  const findValues = (labels?: string[]) => {
    return labels?.length
      ? options.value
          .filter((option) => labels.includes(option.label || ""))
          .map((i) => i.value)
      : [];
  };

  const getAllValues = () => options.value.map((i) => i.value) || [];

  const getAllLabels = () => options.value.map((i) => i.label) || [];

  return {
    options,
    init,
    findLabel,
    findOptions,
    findLabels,
    findValues,
    getAllValues,
    getAllLabels,
  };
}
