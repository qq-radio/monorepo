<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema } from "@center/components";

import MockUserList from "../../mocks/user-list.json";

const schemas: TableSchema[] = [
  {
    label: "用户名",
    prop: "username",
    headerTooltip: "为了展示display link的用法，实际是个假的用户跳转页面",
    display: "link",
    displayProps: {
      href: "/",
      type: "success",
    },
    displaySlots: ({ value }) => ({
      default: () => value,
    }),
  },
  {
    label: "手机号",
    prop: "phone",
    display: "copy",
    displayProps: ({ value }) => ({
      text: value,
    }),
  },
  {
    label: "部门",
    prop: "departmentName",
    display: "progress",
    displayProps: ({ value }) => ({
      style: {
        width: "140px",
      },
    }),
  },
  {
    label: "岗位",
    prop: "job",
    display: "tag",
    displayProps: {
      type: "primary",
    },
    displaySlots: ({ value }) => ({
      default: () => value,
    }),
  },
  {
    label: "开发进度",
    prop: "progress",
    display: "progress",
    displayProps: ({ value }) => ({
      percentage: value,
      textInside: true,
      strokeWidth: 16,
      status: value > 60 ? (value > 90 ? "success" : "warning") : "exception",
    }),
  },
  {
    label: "头像",
    prop: "image",
    display: "avatar",
    displayProps: ({ value }) => ({
      src: value,
      size: 80,
    }),
  },
  {
    label: "图片",
    prop: "image",
    display: "image",
    displayProps: ({ value }) => ({
      src: value,
    }),
  },
  {
    label: "状态",
    prop: "status",
    headerTooltip:
      "该页面只是demo，请不要在真实项目中也用value === 1去判断，凡是枚举值都应放置在对应的后端服务的domain层下",
    display: "status",
    displayProps: ({ value }) => ({
      text: value === 1 ? "在职中" : "已离职",
      type: value === 1 ? "success" : "danger",
    }),
  },
  {
    label: "创建时间",
    prop: "createTime",
    display: "time",
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
});
</script>
