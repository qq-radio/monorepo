<template>
  <BasicTable @register="registerTable">
    <template #phone="{ value }">
      <el-icon style="color: #25a6e7; margin-right: 4px"><Phone /></el-icon
      >{{ value }}
    </template>
    <template #department="{ row }">
      {{
        `${row.departmentLevelOneName}/${row.departmentLevelTwoName}/${row.departmentLevelThreeName}/${row.departmentName}`
      }}
    </template>
    <template #status="{ value }">
      <el-icon>
        <CircleCheckFilled
          v-if="value === 1"
          style="color: #8dd35f"
        /><CircleCloseFilled v-else style="color: #ca5555" />
      </el-icon>
      {{ value === 1 ? "在职中" : "已离职" }}
    </template>
  </BasicTable>
</template>

<script lang="tsx" setup>
import { BasicTable, useTable, TableSchema } from "@center/components";

import userListMockData from "@mocks/user-list.json";

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
    customSlot: "phone",
  },
  {
    label: "部门",
    prop: "departmentName",
    customSlot: "department",
  },
  {
    label: "岗位",
    prop: "job",
  },
  {
    label: "状态",
    prop: "status",
    customSlot: "status",
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

const [registerTable] = useTable({
  request: userListApi,
  schemas,
});
</script>
