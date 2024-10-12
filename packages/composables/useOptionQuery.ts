import type { Ref } from "vue";

import { ref } from "vue";
import {
  isArray,
  isFunction,
  getValue,
  mapObjectArrayFields,
} from "@center/utils";

export type Value = string | number | boolean | undefined;

export interface Option {
  label?: string;
  value?: Value;
  [key: string]: any;
}

export interface UseOptionQuery {
  (props: {
    options?: Option[];
    label?: string;
    value?: Value;
    api?: () => Promise<any>;
    resultField?: string;
    labelField?: string;
    valueField?: string;
  }): {
    options: Ref<Option[]>;
    init: () => void;
    findLabel: (value: Value) => string | undefined;
  };
}

export const useOptionQuery: UseOptionQuery = (props) => {
  const options = ref<Option[]>([]);

  const init = () => {
    if (isArray(props.options)) {
      options.value = props.options;
      return;
    }

    if (!isArray(props.options) && props.label) {
      options.value = [
        {
          label: props.label,
          value: props.value || props.label,
        },
      ];
      return;
    }

    query();
  };

  const query = async () => {
    const { api } = props;

    try {
      if (!isFunction(api)) {
        return;
      }

      const result = await api();
      options.value = handleResult(result);
    } catch (error) {
      console.error("UseOptionQuery query error:", error);
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

  return {
    options,
    init,
    findLabel,
  };
};
