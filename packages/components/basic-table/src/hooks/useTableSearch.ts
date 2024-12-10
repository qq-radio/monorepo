import type { BasicTableProps, BasicTableEmits, TableSchema } from "../types";
import type {
  BasicFormProps,
  FormSchema,
} from "@center/components/basic-form/src/types";
import type { ComputedRef } from "vue";

import { ref, computed, watch } from "vue";
import { merge, isArray, isObject } from "lodash";

type Props = ComputedRef<
  Pick<
    BasicTableProps,
    "searchProps" | "searchParams" | "searchSchemas" | "schemas"
  >
>;

type Context = {
  emit: BasicTableEmits;
};

export type UseTableSearchReturn = ReturnType<typeof useTableSearch>;

export function useTableSearch(getProps: Props, context: Context) {
  const { emit } = context;

  const getSearchProps = computed<Partial<BasicFormProps>>(() => {
    return merge(
      {
        labelWidth: 80,
        labelPosition: "left",
        colProps: {
          span: 8,
        },
        submitText: "查询",
        hasFooter: true,
      },
      getProps.value.searchProps
    );
  });

  const getSearchSchemas = computed(() => {
    const { searchSchemas, schemas } = getProps.value;
    return isArray(searchSchemas)
      ? searchSchemas
      : normalizeSearchSchemas(schemas);
  });

  const formParams = ref<Recordable>({});

  watch(
    () => getProps.value.searchParams,
    (searchParams) => {
      formParams.value = {
        ...formParams.value,
        ...searchParams,
      };
    },
    { immediate: true, deep: true }
  );

  watch(
    () => formParams.value,
    () => {
      emit("search-params-change", formParams.value || {});
    },
    { immediate: true, deep: true }
  );

  return {
    getSearchProps,
    getSearchSchemas,
    formParams,
  };
}

function normalizeSearchSchemas(schemas: TableSchema[]) {
  const searchSchemas: FormSchema[] = [];

  schemas
    .filter((item) => item.searchable === true || isObject(item.searchConfig))
    .forEach((item) => {
      if (item.searchable) {
        const label = item.label || "";
        const prop = item.prop;
        if (prop) {
          searchSchemas.push({
            label,
            prop,
            component: "input",
          });
        }
        return;
      }
      if (item.searchConfig) {
        const label = item.searchConfig.label || item.label || "";
        const prop = item.searchConfig.prop || item.prop;
        if (prop) {
          searchSchemas.push({
            ...item.searchConfig,
            label,
            prop,
          });
        }
      }
    });

  return searchSchemas;
}
