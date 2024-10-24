import type { BasicTableProps } from "./";
import type { FormSchema } from "@center/components/basic-form";
import type { ComputedRef, Ref, Slots } from "vue";

export interface UseTableSearchReturn {
  getSearchProps: ComputedRef<Recordable>;
  getSearchSchemas: ComputedRef<FormSchema[] | undefined>;
  searchParams: Ref<Recordable>;
}

export interface UseTableSearch {
  (
    getProps: ComputedRef<BasicTableProps>,
    context: {
      slots: Slots;
    }
  ): UseTableSearchReturn;
}
