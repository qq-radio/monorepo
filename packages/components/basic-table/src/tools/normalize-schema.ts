import type { TableSchema } from "../types";
import type { FormSchema } from "@center/components/basic-form";

import { merge, isObject } from "lodash";

function addColumnItemMinWidth(columnItem: TableSchema) {
  return merge(
    {
      minWidth: columnItem.width,
    },
    columnItem
  );
}

function filterSchemas(schemas: TableSchema[]) {
  return schemas.filter((item) => item.visible !== false);
}

function normalizecolumnItem(columnItem: TableSchema) {
  return [addColumnItemMinWidth].reduce((acc, func) => func(acc), columnItem);
}

function normalizeTableSchemas(schemas: TableSchema[]) {
  return filterSchemas(schemas).map(normalizecolumnItem); 
}

function normalizeSearchSchemas(schemas: TableSchema[]) {
  const searchSchemas = schemas.filter((item) => isObject(item.searchConfig));

  if (!searchSchemas.length) {
    return [];
  }

  return searchSchemas.map((item) => item.searchConfig) as FormSchema[];
}

export { normalizeTableSchemas, normalizeSearchSchemas };
