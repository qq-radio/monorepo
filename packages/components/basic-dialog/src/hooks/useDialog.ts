import type { BasicDialogProps, DialogMethods, UseDialog } from '../type'

import { ref, unref, watch, onUnmounted } from 'vue'

export const useDialog: UseDialog = (props) => {
  const instanceRef = ref<Nullable<DialogMethods>>(null)

  function getInstance() {
    const instance = unref(instanceRef)
    if (!instance) {
      const error =
        'The dialog instance has not been obtained, please make sure that the dialog has been rendered when performing the dialog operation'
      throw new Error(error)
    }
    return instance
  }

  function register(instance: DialogMethods) {
    onUnmounted(() => {
      instanceRef.value = null
    })

    instanceRef.value = instance

    watch(
      () => props,
      () => {
        const propsValue = unref(props)
        if (propsValue) {
          getInstance().setProps(propsValue)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: DialogMethods = {
    setProps: (props: Partial<BasicDialogProps>) => {
      getInstance().setProps(props)
    },

    openDialog: () => {
      getInstance().openDialog()
    },

    closeDialog: () => {
      getInstance().closeDialog()
    },

    setDialogTitle: (value) => {
      getInstance().setDialogTitle(value)
    },

    setConfirmLoading: (loading) => {
      getInstance().setConfirmLoading(loading)
    }
  }

  return [register, methods]
}
