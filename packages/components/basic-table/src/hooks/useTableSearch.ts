import type { UseTableSearch } from "../types";

import { normalizeSearchSchemas } from "../tools/normalize-schema";

import { ref, computed } from "vue";
import { merge } from "lodash";

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
    normalizeSearchSchemas(getProps.value.schemas)
  );

  const searchParams = ref<Recordable>({});

  return {
    getSearchProps,
    getSearchSchemas,
    searchParams,
  };
};
