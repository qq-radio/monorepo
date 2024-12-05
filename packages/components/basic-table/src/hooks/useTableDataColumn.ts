import type { UseTableDataColumn } from "../types";
import { isArray, isEmpty, pick } from "lodash";

import { shallowRef, watch } from "vue";

export const useTableDataColumn: UseTableDataColumn = (getProps, { slots }) => {
  const tableHeaderSlots = shallowRef({});
  const tableCellSlots = shallowRef({});

  watch(
    () => getProps.value.tableSchemas,
    (tableSchemas) => {
      if (isArray(tableSchemas)) {
        const a = tableSchemas
          ?.filter((s) => s.customHeaderSlot)
          ?.map((s) => s.customHeaderSlot);
        tableHeaderSlots.value = isEmpty(a) ? {} : pick(slots, a);

        const b = tableSchemas
          ?.filter((s) => s.customSlot)
          ?.map((s) => s.customSlot);
        tableCellSlots.value = isEmpty(b) ? {} : pick(slots, b);
      }
    },
    { immediate: true, deep: true }
  );

  return {
    tableHeaderSlots,
    tableCellSlots,
  };
};
