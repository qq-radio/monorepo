<template>
  <BasicTable
    :request="userListApi"
    :schemas="schemas"
    :operations="operations"
    :actions="actions"
  />
</template>

<script lang="tsx" setup>
import {
  BasicTable,
  TableSchema,
  OperationButton,
  ActionButton,
} from "@center/components";

import userListMockData from "@mocks/user-list.json";
import departmentTreeMockData from "@mocks/department.json";

const operations: OperationButton[] = [
  {
    text: "新增",
    onClick: () => {
      console.log("点击了新增");
    },
  },
];

const actions: ActionButton[] = [
  {
    text: "编辑",
    onClick: () => {
      console.log("点击了编辑");
    },
  },
  {
    text: "删除",
    onConfirm: ({ row }) => {
      console.log("点击了删除");
    },
  },
];

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
    searchConfig: {
      label: "用户名",
      prop: "username",
      component: "input",
    },
  },
  {
    label: "手机号",
    prop: "phone",
  },
  {
    label: "部门",
    prop: "departmentName",
    searchConfig: {
      label: "部门",
      prop: "departmentId",
      component: "tree-select",
      componentProps: {
        data: departmentTreeMockData,
        props: {
          value: "id",
          label: "name",
          children: "children",
        },
      },
    },
  },
  {
    label: "岗位",
    prop: "job",
    searchConfig: {
      label: "岗位",
      prop: "job",
      component: "select",
      componentProps: {
        options: [],
      },
    },
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
    searchConfig: {
      label: "状态",
      prop: "status",
      component: "select",
      componentProps: {
        options: [
          { label: "正常", value: 1 },
          { label: "异常", value: 0 },
        ],
      },
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const userListApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: userListMockData.length,
        records: userListMockData,
      });
    }, 1000);
  });
};
</script>
