<template>
  <component
    :is="getComponent(props.type)"
    v-if="hasComponent(type)"
    v-bind="displayProps"
  />
</template>

<script lang="ts" setup>
import type { BasicDisplayProps } from './type'

import { hasComponent, getComponent } from './tools/component'
import { mergeComponentProps } from './tools/component-props'

import { computed } from 'vue'

defineOptions({
  name: 'BasicDisplay'
})

const props = withDefaults(defineProps<BasicDisplayProps>(), {
  value: '',
  customProps: () => ({})
})

const displayProps = computed(() => ({
  ...mergeComponentProps(props.type, props.value, props.customProps),
  value: props.value
}))
</script>
