import type { FormItemEmits, FormSchema } from '.'

export type FormItemEventHandler = {
  condition: (schema: FormSchema) => boolean
  handler: (values: unknown[], schema: FormSchema) => void
}

export interface UseFormItemHandlerReturn {
  handleChange: (values: unknown[], schema: FormSchema) => void
}

export interface UseFormItemHandler {
  (context: { emit: FormItemEmits }): UseFormItemHandlerReturn
}
