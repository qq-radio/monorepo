import type { UseTableDataColumn } from "../types";
import { isEmpty, pick } from "lodash";

import { computed } from "vue";

export const useTableDataColumn: UseTableDataColumn = (getProps, { slots }) => {
  const tableHeaderSlots = computed(() => {
    const keys = getProps.value.schemas
      .filter((s) => s.customHeaderSlot)
      .map((s) => s.customHeaderSlot);

    return isEmpty(keys) ? {} : pick(slots, keys);
  });

  const tableCellSlots = computed(() => {
    const keys = getProps.value.schemas
      .filter((s) => s.customSlot)
      .map((s) => s.customSlot);

    return isEmpty(keys) ? {} : pick(slots, keys);
  });

  return {
    tableHeaderSlots,
    tableCellSlots,
  };
};
