import type { BasicFormProps, UseFormSelfReturn, UseFormEventReturn } from "./";

export interface FormMethods
  extends UseFormSelfReturn,
    Omit<UseFormEventReturn, "formSchemas" | "formModel" | "emitUpdateModel"> {
  setProps: (props: Partial<BasicFormProps>) => void;
  submit: () => Promise<unknown>;
  reset: () => void;
}

type UseFormReturn = [(instance: FormMethods) => void, FormMethods];

export interface UseForm {
  (props?: Partial<BasicFormProps>): UseFormReturn;
}
