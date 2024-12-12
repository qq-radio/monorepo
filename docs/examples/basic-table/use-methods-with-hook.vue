<template>
  <div v-for="example in examples" :key="example" class="example">
    <el-tooltip placement="top" :content="example.description">
      <el-icon class="example__description">
        <InfoFilled />
      </el-icon>
    </el-tooltip>
    <BasicButtonGroup :buttons="example.buttons" />
  </div>
  <BasicTable @register="register" />
</template>

<script lang="ts" setup>
import {
  BasicTable,
  useTable,
  TableSchema,
  BasicButtonGroup,
  Button,
} from "@center/components";

import userListMockData from "@mocks/user-list.json";

import { InfoFilled } from "@element-plus/icons-vue";

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

const [
  register,
  {
    getTableDatas,
    getSearchParams,
    getRequestParams,
    reQuery,

    getRadioSelectedValue,
    setRadioSelectedValue,
    getRadioSelectedRow,
    setRadioSelectedRow,
    clearRadioSelected,
  },
] = useTable({
  schemas,
  request: userListApi,
  rowKey: "code",
  hasRadioSelection: true,
  radioSelectionColumnProps: {
    fixed: true,
    align: "center",
  },
});

type Example = {
  description: string;
  buttons: Button[];
};

const examples: Example[] = [
  {
    description: "与表格搜索、表格数据相关的功能函数",
    buttons: [
      {
        text: "getTableDatas",
        onClick: () => {
          const datas = getTableDatas();
          console.log("获取表格数据", datas);
        },
      },
      {
        text: "getSearchParams",
        onClick: () => {
          const params = getSearchParams();
          console.log("获取搜索参数", params);
        },
      },
      {
        text: "getRequestParams",
        onClick: () => {
          const params = getRequestParams();
          console.log("获取网络请求参数", params);
        },
      },
      {
        text: "reQuery",
        onClick: () => {
          reQuery();
          console.log("重新请求接口获取表格数据成功");
        },
      },
    ],
  },
  {
    description: "提供一组用于表格单选的功能函数",
    buttons: [
      {
        text: "getRadioSelectedValue",
        onClick: () => {
          const value = getRadioSelectedValue();
          console.log("(单选)获取勾选值", value);
        },
      },
      {
        text: "setRadioSelectedValue",
        onClick: () => {
          setRadioSelectedValue(userListMockData[1].code);
          console.log("(单选)设置勾选值成功");
        },
      },
      {
        text: "getRadioSelectedRow",
        onClick: () => {
          const row = getRadioSelectedRow();
          console.log("(单选)获取勾选项", row);
        },
      },
      {
        text: "setRadioSelectedRow",
        onClick: () => {
          setRadioSelectedRow(userListMockData[2]);
          console.log("(单选)设置勾选项成功");
        },
      },
      {
        text: "clearRadioSelected",
        onClick: () => {
          clearRadioSelected();
          console.log("(单选)清空勾选成功");
        },
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.example {
  display: flex;

  .example__description {
    margin-top: 8px;
    margin-right: 10px;
  }
}
</style>
