<template>
  <BasicTable
    v-model:search-params="searchParams"
    :request="userListApi"
    :schemas="schemas"
    :search-props="{
      labelWidth: 60,
      labelPosition: 'left',
      rowProps: {
        gutter: 40,
      },
      colProps: {
        span: 6,
      },
    }"
  >
    <template #search-username>
      <el-input v-model="searchParams.username" placeholder="请输入用户名" />
    </template>
    <template #search-status>
      <BasicSelect
        v-model="searchParams.status"
        :options="statusOptions"
        placeholder="请选择状态"
      />
    </template>
  </BasicTable>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="搜索值" name="params">
      {{ searchParams }}
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { BasicTable, TableSchema, BasicSelect } from '@center/components'

import userListMockData from '@mocks/user-list.json'

interface ApiResponse {
  total: number
  records: any[]
}

// 该api简单模拟查询接口数据的过滤
const userListApi = (params): Promise<ApiResponse> => {
  let response = [...userListMockData]
  const { username, status } = params
  if (username && status) {
    response = userListMockData.filter(
      (user) => user.username === username && user.status === status,
    )
  } else if (username) {
    response = userListMockData.filter((user) => user.username === username)
  } else if (status) {
    response = userListMockData.filter((user) => user.status === status)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: response.length,
        records: response,
      })
    }, 300)
  })
}

const statusOptions = [
  { label: '在职中', value: 1 },
  { label: '已离职', value: 2 },
]

const schemas: TableSchema[] = [
  {
    label: '用户名',
    prop: 'username',
    searchConfig: {
      customSlot: 'search-username',
    },
  },
  {
    label: '手机号',
    prop: 'phone',
  },
  {
    label: '岗位',
    prop: 'job',
  },
  {
    label: '状态',
    prop: 'status',
    display: 'status',
    displayProps: ({ value }) => ({
      text: value === 1 ? '在职中' : '已离职',
      type: value === 1 ? 'success' : 'danger',
    }),
    searchConfig: {
      customSlot: 'search-status',
      required: true,
    },
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
]

const activeNames = ref(['params'])

const searchParams = ref<any>({})
</script>
