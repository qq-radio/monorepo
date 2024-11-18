import type { FormSchema, NormalizedFormSchema } from "../types";

import { getPrefix } from "./component-prefix";
import { normalizeRule } from "./normalize-rule";

import { uniqBy, merge, isArray, isObject } from "lodash";

function addDefaultComponent(schemaItem: FormSchema) {
  return merge(
    {
      component: "input",
    },
    schemaItem
  );
}

function addFormItemStyle(schemaItem: FormSchema) {
  if (
    ["input-number", "select", "tree-select", "cascader"].includes(
      schemaItem.component
    )
  ) {
    return merge(
      {
        componentProps: {
          style: {
            width: "100%",
          },
        },
      },
      schemaItem
    );
  }

  return schemaItem;
}

function getPlaceholder(schemaItem) {
  return getPrefix(schemaItem.component) + schemaItem.label;
}

function addFormItemPlaceholder(schemaItem: FormSchema) {
  return merge(
    {
      componentProps: {
        placeholder: getPlaceholder(schemaItem),
      },
    },
    schemaItem
  );
}

function addTimePickerPlaceholder(schemaItem: FormSchema) {
  if (schemaItem.component !== "time-picker") {
    return schemaItem;
  }

  return merge(
    {
      componentProps: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
      },
    },
    schemaItem
  );
}

function addDateRangePlaceholder(schemaItem: FormSchema) {
  if (
    schemaItem.component !== "date-picker" &&
    schemaItem.componentProps?.type !== "daterange"
  ) {
    return schemaItem;
  }

  return merge(
    {
      componentProps: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
      },
    },
    schemaItem
  );
}

function addFormItemAllowClear(schemaItem: FormSchema) {
  return merge(
    {
      componentProps: {
        clearable: true,
      },
    },
    schemaItem
  );
}

function addFormItemTimeFormat(schemaItem: FormSchema) {
  if (schemaItem.component === "date-picker") {
    return merge(
      {
        componentProps: {
          format: schemaItem?.componentProps?.format || "YYYY-MM-DD",
          valueFormat: schemaItem?.componentProps?.valueFormat || "YYYY-MM-DD",
        },
      },
      schemaItem
    );
  }

  if (schemaItem.component === "time-picker") {
    return merge(
      {
        componentProps: {
          format: schemaItem?.componentProps?.format || "HH:mm:ss",
          valueFormat: schemaItem?.componentProps?.valueFormat || "HH:mm:ss",
        },
      },
      schemaItem
    );
  }

  return schemaItem;
}

function filterSchemas(schemas: FormSchema[]) {
  return schemas.filter((schemaItem) => schemaItem.prop || schemaItem.title);
}

function sortSchemas(schemas: FormSchema[]) {
  return schemas.sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function normalizeSchemaItem(schemaItem: FormSchema): NormalizedFormSchema {
  return [
    addDefaultComponent,
    addFormItemStyle,
    addFormItemPlaceholder,
    addTimePickerPlaceholder,
    addDateRangePlaceholder,
    addFormItemAllowClear,
    addFormItemTimeFormat,
    normalizeRule,
  ].reduce((acc, func) => func(acc), schemaItem) as NormalizedFormSchema;
}

function normalizeSchemas(schemas: FormSchema[]) {
  return filterSchemas(sortSchemas(schemas)).map(normalizeSchemaItem);
}

function processSchemas<T extends Required<Pick<FormSchema, "prop">>>(
  schemas: Arrayable<T>
): T[] {
  let processedSchemas: T[] = [];

  if (isObject(schemas)) {
    processedSchemas.push(schemas as T);
  }

  if (isArray(schemas)) {
    processedSchemas = [...schemas];
  }

  processedSchemas = processedSchemas.filter((item) => item.prop);

  return uniqBy(processedSchemas, "prop");
}

export { normalizeSchemas, normalizeSchemaItem, processSchemas };
