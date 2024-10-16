import type { Ref } from "vue";

import { ref } from "vue";
import {
  isArray,
  isFunction,
  getValue,
  mapObjectArrayFields,
} from "@center/utils";

export type Value = string | number;

export interface Option {
  label?: string;
  value?: Value;
  [key: string]: any;
}

export interface UseOptionQuery {
  (props: {
    options?: Option[];
    api?: () => Promise<any>;
    resultField?: string;
    labelField?: string;
    valueField?: string;
  }): {
    options: Ref<Option[]>;
    init: () => void;
    findLabel: (value: Value) => string | undefined;
    filterOptionsByValue: (values: Value[]) => Option[];
    findLabels: (values: Value[]) => string[];
    findValues: (values: Value[]) => string[];
  };
}

export const useOptionQuery: UseOptionQuery = (props) => {
  const options = ref<Option[]>([]);

  const init = async () => {
    try {
      if (isArray(props.options)) {
        options.value = handleResult(props.options);
        return;
      }

      if (isFunction(props.api)) {
        const result = await props.api();
        options.value = handleResult(result);
      }
    } catch (error) {
      console.error("UseOptionQuery init error:", error);
    }
  };

  const handleResult = (result: unknown) => {
    const { resultField, labelField, valueField } = props;

    const list = resultField ? getValue(result, resultField) : result;

    if (!isArray(list)) {
      return [];
    }

    if (labelField && valueField) {
      return mapObjectArrayFields(list, {
        label: labelField,
        value: valueField,
      });
    }

    return list;
  };

  const findLabel = (value: Value) =>
    (props.options || options.value).find((s) => s.value === value)?.label;

  const filterOptionsByValue = (values) => {
    return options.value.filter((option) =>
      values.includes(option.value || "")
    );
  };

  const findLabels = (values) => {
    return options.value
      .filter((option) => values.includes(option.value || ""))
      .map((i) => i.label);
  };

  const findValues = (labels) => {
    return options.value
      .filter((option) => labels.includes(option.label || ""))
      .map((i) => i.value);
  };

  return {
    options,
    init,
    findLabel,
    filterOptionsByValue,
    findLabels,
    findValues,
  };
};
