import type { Ref, UnwrapRef } from "vue";

import { ref } from "vue";
import {
  isArray,
  isFunction,
  getValue,
  mapObjectArrayFields,
} from "@center/utils";

export type Value = undefined | string | number;

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
        options.value = normalizeOptions(props.options);
        return;
      }

      if (isFunction(props.api)) {
        const result = await props.api();
        options.value = normalizeOptions(result);
      }
    } catch (error) {
      console.error("UseOptionQuery init error:", error);
    }
  };

  const normalizeOptions = (result) => {
    const { resultField, labelField, valueField, formatter } = props;

    let list = resultField ? getValue(result, resultField) : result;

    if (!isArray(list)) {
      return [];
    }

    if (labelField || valueField) {
      list = mapObjectArrayFields(list, {
        label: labelField ?? "label",
        value: valueField ?? "value",
      });
    }

    if (isFunction(formatter)) {
      list = list.map(formatter);
    }

    return list;
  };

  const getAllLabels = () => options.value.map((i) => i.label) || [];

  const getAllValues = () => options.value.map((i) => i.value) || [];

  const findOption = (value: Value) => {
    return options.value.find((option) => option.value === value);
  };

  const findLabel = (value: Value) => findOption(value)?.label;

  const findOptions = (values: Value[]) =>
    options.value.filter((option) => values.includes(option.value));

  const findLabels = (values: Value[]) =>
    values?.length ? findOptions(values).map((i) => i.label) : [];

  const findValues = (labels: string[]) =>
    labels?.length
      ? options.value
          .filter((option) => labels.includes(option.label))
          .map((i) => i.value)
      : [];

  return {
    options,
    init,
    getAllLabels,
    getAllValues,
    findOption,
    findLabel,
    findOptions,
    findLabels,
    findValues,
  };
}
