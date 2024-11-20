<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema, Button } from "@center/components";
import MockUserList from "../../mocks/user-list.json";

const operations: Button[] = [
  {
    text: "新增",
    onClick: () => {
      console.log("点击了新增");
    },
  },
  {
    text: "批量启用",
    onConfirm: () => {
      console.log("点击了批量启用");
    },
  },
  {
    text: "批量禁用",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了批量禁用");
    },
  },
  {
    text: "批量删除",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了批量删除");
    },
  },
];

const actions: Button[] = [
  {
    text: "编辑",
    onClick: () => {
      console.log("点击了编辑");
    },
  },
  {
    text: "启用",
    onConfirm: () => {
      console.log("点击了启用");
    },
  },
  {
    text: "禁用",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了禁用");
    },
  },
  {
    text: "删除",
    props: {
      type: "danger",
    },
    onConfirm: () => {
      console.log("点击了删除");
    },
  },
  {
    text: "复制",
    onClick: () => {
      console.log("点击了复制");
    },
  },
  {
    text: "查看详情",
    onClick: () => {
      console.log("点击了查看详情");
    },
  },
  {
    text: "查看明细",
    onClick: () => {
      console.log("点击了查看明细");
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
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    display: "status",
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
        total: MockUserList.length,
        records: MockUserList,
      });
    }, 1000);
  });
};

const [registerTable] = useTable({
  request: userListApi,
  schemas,
  operations,
  actions,
  actionColumnProps: {
    width: 280,
  },
});
</script>
