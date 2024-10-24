<template>
  <el-pagination
    v-bind="getBindValues"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    :total="page.total"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import type { BasicPaginationProps, BasicPaginationEmits, Page } from './type'

import { ref, computed, watchEffect, useAttrs } from 'vue'

defineOptions({
  name: 'BasicPagination'
})

const attrs = useAttrs()

const props = withDefaults(defineProps<BasicPaginationProps>(), {
  modelValue: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
})

const emit = defineEmits<BasicPaginationEmits>()

const defaultProps = {
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500],
  currentPage: 1,
  pageSize: 10
}

const getBindValues = computed(() => ({
  ...defaultProps,
  ...attrs
}))

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

watchEffect(() => {
  page.value = { ...props.modelValue }
})

const handleEmit = () => {
  emit('update:modelValue', page.value)
  emit('change', page.value)
}

const handleCurrentChange = (p: number) => {
  page.value.currentPage = p
  handleEmit()
  emit('current-change', p)
}

const handleSizeChange = (s: number) => {
  page.value.pageSize = s
  page.value.currentPage = 1
  handleEmit()
  emit('size-change', s)
}
</script>
