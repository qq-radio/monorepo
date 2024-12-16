<template>
  <BasicTable
    v-model:search-params="searchParams"
    :request="userListApi"
    :schemas="schemas"
  />
  <el-collapse v-model="activeNames">
    <el-collapse-item title="搜索值" name="params">
      {{ searchParams }}
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { BasicTable, TableSchema } from "@center/components";

import userListMockData from "@mocks/user-list.json";

interface ApiResponse {
  total: number;
  records: any[];
}

// 该api简单模拟查询接口数据的过滤
const userListApi = (params): Promise<ApiResponse> => {
  let response = [...userListMockData];
  const { username, status } = params;
  if (username && status) {
    response = userListMockData.filter(
      (user) => user.username === username && user.status === status
    );
  }
  if (username) {
    response = userListMockData.filter((user) => user.username === username);
  }
  if (status) {
    response = userListMockData.filter((user) => user.status === status);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: response.length,
        records: response,
      });
    }, 300);
  });
};

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
    searchable: true,
  },
  {
    label: "手机号",
    prop: "phone",
    searchable: true,
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
    displayProps: ({ value }) => ({
      text: value === 1 ? "在职中" : "已离职",
      type: value === 1 ? "success" : "danger",
    }),
    searchConfig: {
      component: "select",
      componentProps: {
        options: [
          { label: "在职中", value: 1 },
          { label: "已离职", value: 2 },
        ],
      },
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const activeNames = ref(["params"]);

const searchParams = ref<any>({});
</script>
