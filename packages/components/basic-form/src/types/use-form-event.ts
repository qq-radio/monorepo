import type { BasicFormProps, BasicFormEmits, FormSchema } from "./";
import type { ComputedRef, Ref } from "vue";

export type UpdateSchemaParams = Partial<FormSchema> &
  Required<Pick<FormSchema, "prop">>;

export type NormalizedFormSchema = Required<FormSchema>;

export interface UseFormEventReturn {
  formSchemas: Ref<NormalizedFormSchema[]>;
  formModel: Ref<Recordable>;
  updateSchema: (schemas: Arrayable<UpdateSchemaParams>) => void;
  removeSchema: (prop: Arrayable<string>) => void;
  appendSchema: (schemas: Arrayable<FormSchema>, previousProp?: string) => void;
  getFieldValue: (field: string) => any;
  getFieldsValue: () => Recordable;
  setFieldsValue: (values: Recordable) => void;
  resetFieldsValue: () => void;
  emitUpdateModel: () => void;
}

export interface UseFormEvent {
  (
    getProps: ComputedRef<BasicFormProps>,
    context: {
      emit: BasicFormEmits;
    }
  ): UseFormEventReturn;
}
