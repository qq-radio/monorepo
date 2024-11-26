import type { UseTableSearch, TableSchema } from "../types";

import type { FormSchema } from "@center/components/basic-form/src/types";

import { ref, computed } from "vue";
import { merge, isArray, isObject } from "lodash";

export const useTableSearch: UseTableSearch = (getProps) => {
  const getSearchProps = computed(() => {
    return merge(
      {
        labelWidth: 80,
        labelPosition: "left",
        colProps: {
          span: 8,
        },
      },
      getProps.value.searchProps
    );
  });

  const getSearchSchemas = computed(() =>
    isArray(getProps.value.searchSchemas)
      ? getProps.value.searchSchemas
      : normalizeSearchSchemas(getProps.value.schemas)
  );

  const searchParams = ref<Recordable>({});

  return {
    getSearchProps,
    getSearchSchemas,
    searchParams,
  };
};

function normalizeSearchSchemas(schemas: TableSchema[]) {
  const searchSchemas: FormSchema[] = [];

  schemas
    .filter((item) => item.searchable || isObject(item.searchConfig))
    .forEach((item) => {
      if (item.searchable) {
        searchSchemas.push({
          label: item.label,
          prop: item.prop,
          component: "input",
        });
      } else {
        searchSchemas.push({
          ...item.searchConfig,
          label: item.searchConfig?.label || item.label,
          prop: item.searchConfig?.prop || item.prop,
        });
      }
    });

  if (!searchSchemas.length) {
    return [];
  }

  return searchSchemas;
}
