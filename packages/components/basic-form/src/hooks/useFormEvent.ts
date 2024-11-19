import type {
  UseFormEvent,
  FormSchema,
  NormalizedFormSchema,
  UpdateSchemaParams,
} from "../types";

import {
  normalizeSchemas,
  normalizeSchemaItem,
  processSchemas,
} from "../tools/normalize-schema";

import { ref, unref, watch } from "vue";
import { isObject, isString, cloneDeep, merge } from "lodash";

export const useFormEvent: UseFormEvent = (getProps, { emit }) => {
  const formSchemas = ref<NormalizedFormSchema[]>([]);
  const formModel = ref<Recordable<any>>({});

  watch(
    () => getProps.value.schemas,
    () => {
      initSchemas();
      initModel();
    },
    {
      deep: true,
      immediate: true,
    }
  );

  function initSchemas() {
    formSchemas.value = normalizeSchemas(getProps.value.schemas);
  }

  function initModel() {
    formModel.value = {
      ...getDefaultValue(),
      ...getProps.value.modelValue,
    };
  }

  function getDefaultValue() {
    return cloneDeep(
      Object.fromEntries(formSchemas.value.map((s) => [s.prop, s.defaultValue]))
    );
  }

  function getSchema(prop: string) {
    return formSchemas.value.find((item) => item.prop === prop);
  }

  function getSchemaIndex(prop: string) {
    return formSchemas.value.findIndex((item) => item.prop === prop);
  }

  function updateSchema(schemas: Arrayable<UpdateSchemaParams>) {
    const waitUpdateSchemas = processSchemas(schemas);

    if (!waitUpdateSchemas.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    waitUpdateSchemas.forEach((schema) => {
      const updateIndex = getSchemaIndex(schema.prop);

      if (updateIndex === -1) {
        return;
      }

      const oldSchema = unref(formSchemas)[updateIndex];

      if (oldSchema) {
        const newSchema = merge(oldSchema, schema);
        _updateSchemaItemByIndex(updateIndex, newSchema);
      }
    });
  }

  function _updateSchemaItemByIndex(
    index: number,
    schema: NormalizedFormSchema
  ) {
    formSchemas.value.splice(index, 1, schema);
  }

  function appendSchema(schemas: Arrayable<FormSchema>, previousProp?: string) {
    const waitAppendSchemas = processSchemas(schemas);

    if (!waitAppendSchemas.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    waitAppendSchemas.forEach((schema) => {
      const isExist = getSchema(schema.prop);
      if (isExist) {
        return;
      }

      const previousIndex = previousProp ? getSchemaIndex(previousProp) : 0;
      _appendSchemaItemByIndex(previousIndex + 1, normalizeSchemaItem(schema));
    });
  }

  function _appendSchemaItemByIndex(
    index: number,
    schema: NormalizedFormSchema
  ) {
    formSchemas.value.splice(index, 0, schema);
  }

  function removeSchema(prop: Arrayable<string>) {
    const propList = (isString(prop) ? [prop] : prop) as string[];

    if (!propList.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    propList.forEach((prop) => {
      const removeIndex = getSchemaIndex(prop);
      if (removeIndex === -1) {
        return;
      }
      _removeSchemaItemByIndex(removeIndex);
    });
  }

  function _removeSchemaItemByIndex(index: number) {
    formSchemas.value.splice(index, 1);
  }

  function getFieldValue(field: string) {
    return formModel.value[field];
  }

  function getFieldsValue() {
    return formModel.value;
  }

  function setFieldsValue(values: Recordable<any>) {
    if (!isObject(values)) {
      return;
    }

    for (const [field, value] of Object.entries(values)) {
      formModel.value[field] = value;
    }

    emitUpdateModel();
  }

  function resetFieldsValue() {
    formModel.value = getDefaultValue();
  }

  function emitUpdateModel() {
    emit("update:modelValue", formModel.value);
  }

  return {
    formSchemas,
    formModel,

    updateSchema,
    removeSchema,
    appendSchema,

    getFieldValue,
    getFieldsValue,
    setFieldsValue,
    resetFieldsValue,
    emitUpdateModel,
  };
};
