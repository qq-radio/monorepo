<template>
  <BasicTreeSelect
    v-model="value"
    :api="api"
    node-key="id"
    :props="{ label: 'name', children: 'children' }"
    multiple
    default-expand-all
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="ts">
import { BasicTreeSelect } from "@center/components";

const value = ref();

const request = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "响应成功",
        result: [
          {
            id: 6706,
            parentId: 1,
            name: "全国营销本部",
            deptCode: "00010001",
            children: [
              {
                id: 8531,
                parentId: 6706,
                name: "西南事业部",
                deptCode: "000100010002",
                children: [
                  {
                    id: 13411,
                    parentId: 8531,
                    name: "黔北大区",
                    deptCode: "0001000100020006",
                    children: [
                      {
                        id: 13412,
                        parentId: 13411,
                        name: "贵阳服务处",
                        deptCode: "00010001000200060001",
                      },
                      {
                        id: 13419,
                        parentId: 13411,
                        name: "遵义服务处",
                        deptCode: "00010001000200060002",
                      },
                      {
                        id: 13423,
                        parentId: 13411,
                        name: "毕节服务处",
                        deptCode: "00010001000200060003",
                      },
                      {
                        id: 13427,
                        parentId: 13411,
                        name: "铜仁服务处",
                        deptCode: "00010001000200060004",
                      },
                      {
                        id: 13843,
                        parentId: 13411,
                        name: "凤冈服务处",
                        deptCode: "00010001000200060005",
                      },
                    ],
                  },
                ],
              },
              {
                id: 10873,
                parentId: 6706,
                name: "华中事业部",
                deptCode: "000100010004",
              },
            ],
          },
        ],
      });
    }, 1000);
  });
};

const api = async () => {
  const datas = await request();
  return datas.result;
};
</script>
