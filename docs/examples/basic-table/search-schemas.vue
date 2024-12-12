<template>
  <BasicTable
    :request="userListApi"
    :searchSchemas="searchSchemas"
    :schemas="schemas"
  />
</template>

<script setup lang="ts">
import { BasicTable, FormSchema, TableSchema } from "@center/components";

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

const searchSchemas: FormSchema[] = [
  {
    label: "用户名",
    prop: "username",
    component: "input",
  },
  {
    label: "状态",
    prop: "status",
    component: "select",
    componentProps: {
      options: [
        { label: "在职中", value: 1 },
        { label: "已离职", value: 2 },
      ],
    },
  },
];

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
  },
  {
    label: "手机号",
    prop: "phone",
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
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];
</script>
