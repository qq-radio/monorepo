import type { TableSchema } from "../types";
import type { Slots } from "vue";

import { isEmpty, pick } from "lodash";

export const filterTableHeaderSlots = (
  slots: Slots,
  schemas: TableSchema[]
) => {
  const keys = schemas
    .filter((s) => s.customHeaderSlot)
    .map((s) => s.customHeaderSlot);

  return isEmpty(keys) ? {} : pick(slots, keys);
};

export const filterTableCellSlots = (slots: Slots, schemas: TableSchema[]) => {
  const keys = schemas.filter((s) => s.customSlot).map((s) => s.customSlot);

  return isEmpty(keys) ? {} : pick(slots, keys);
};
