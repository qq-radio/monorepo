import type { DisplayType as ComponentType } from '../type'

import { isObject, merge } from 'lodash'

function mergeComponentProps(
  component: ComponentType,
  value: unknown,
  componentProps: Recordable
): Recordable {
  if (component === 'link') {
    return merge(
      {
        type: 'danger',
        slots: {
          default: () => value
        }
      },
      componentProps
    )
  }

  if (component === 'tag') {
    return merge(
      {
        slots: {
          default: () => value
        }
      },
      componentProps
    )
  }

  if (component === 'status') {
    return merge(isObject(value) ? value : {}, componentProps)
  }

  if (component === 'progress') {
    return merge(
      {
        percentage: value
      },
      componentProps
    )
  }

  return componentProps
}

export { mergeComponentProps }
