<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema } from "@center/components";

import MockUserList from "../../mocks/user-list.json";

import { h } from "vue";

import { ElIcon } from "element-plus";
import {
  Phone,
  CircleCheckFilled,
  CircleCloseFilled,
} from "@element-plus/icons-vue";

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
    customRender: ({ value }) => {
      return h("span", [
        h(
          ElIcon,
          {
            style: {
              color: "#25a6e7",
              marginRight: "4px",
            },
          },
          h(Phone)
        ),
        value,
      ]);
    },
  },
  {
    label: "部门",
    prop: "departmentName",
    customRender: ({ row }) => {
      return h("span", [
        `${row.departmentLevelOneName}/${row.departmentLevelTwoName}/${row.departmentLevelThreeName}/${row.departmentName}`,
      ]);
    },
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    customRender: ({ value }) => {
      return h("span", [
        h(
          ElIcon,
          { style: { verticalAlign: "center" } },
          value === 1
            ? h(CircleCheckFilled, { style: { color: "#8dd35f" } })
            : h(CircleCloseFilled, { style: { color: "#ca5555" } })
        ),
        value === 1 ? "在职中" : "已离职",
      ]);
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
