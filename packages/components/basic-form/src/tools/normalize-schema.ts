import type { FormSchema, NormalizedFormSchema } from "../types";

import { getPrefix } from "./component-prefix";
import { normalizeRule } from "./normalize-rule";

import { merge } from "lodash";

function addTextareaProps(schemaItem: FormSchema) {
  if (schemaItem.component === "textarea") {
    return merge(
      {
        componentProps: {
          type: "textarea",
          showWordLimit: true,
        },
      },
      schemaItem
    );
  }
  return schemaItem;
}

function addStyle(schemaItem: FormSchema) {
  if (
    schemaItem.component &&
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

function addPlaceholder(schemaItem: FormSchema) {
  if (
    schemaItem.component === "time-picker" ||
    (schemaItem.component === "date-picker" &&
      schemaItem.componentProps?.type === "daterange")
  ) {
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

  return merge(
    {
      componentProps: {
        placeholder:
          getPrefix(schemaItem.component || "input") + schemaItem.label,
      },
    },
    schemaItem
  );
}

function addAllowClear(schemaItem: FormSchema) {
  return merge(
    {
      componentProps: {
        clearable: true,
      },
    },
    schemaItem
  );
}

function addTimeFormat(schemaItem: FormSchema) {
  if (schemaItem.component === "date-picker") {
    return merge(
      {
        componentProps: {
          format: "YYYY-MM-DD",
          valueFormat: "YYYY-MM-DD",
        },
      },
      schemaItem
    );
  }

  if (schemaItem.component === "time-picker") {
    return merge(
      {
        componentProps: {
          format: "HH:mm:ss",
          valueFormat: "HH:mm:ss",
        },
      },
      schemaItem
    );
  }

  return schemaItem;
}

function normalizeSchema(schemaItem: FormSchema): NormalizedFormSchema {
  return [
    addTextareaProps,
    addStyle,
    addPlaceholder,
    addAllowClear,
    addTimeFormat,
    normalizeRule,
  ].reduce(
    (acc, func) => func(acc as unknown as NormalizedFormSchema),
    schemaItem
  ) as NormalizedFormSchema;
}

export { normalizeSchema };
