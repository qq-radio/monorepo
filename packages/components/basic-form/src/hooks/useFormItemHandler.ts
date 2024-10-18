import type {
  UseFormItemHandler,
  FormItemEventHandler,
  FormSchema
} from '../types'

import { ref } from 'vue'
import { isArray } from 'lodash'

export const useFormItemHandler: UseFormItemHandler = (context) => {
  const eventHandlers = ref<FormItemEventHandler[]>([
    {
      condition: (schema: FormSchema) => schema.component === 'time-picker',
      handler: (values: unknown[], schema: FormSchema) => {
        onTimeRangeChange(values, schema)
      }
    },
    {
      condition: (schema: FormSchema) =>
        schema.component === 'date-picker' &&
        schema.componentProps?.type === 'daterange',
      handler: (values: unknown[], schema: FormSchema) => {
        onTimeRangeChange(values, schema)
      }
    }
  ])

  const handleChange = (values: unknown[], schema: FormSchema) => {
    for (const { condition, handler } of eventHandlers.value) {
      if (condition(schema)) {
        handler(values, schema)
        break
      }
    }
  }

  function onTimeRangeChange(values: any[], schema: FormSchema) {
    const { componentProps: { timeRangeMapFields } = {} } = schema

    if (!isArray(timeRangeMapFields)) {
      return
    }

    const [startDate, endDate] = timeRangeMapFields
    const value = values[0] || []

    if (!value && !startDate && !endDate) {
      return
    }

    context.emit('field-change', {
      [startDate]: value[0],
      [endDate]: value[1]
    })
  }

  return { handleChange }
}
