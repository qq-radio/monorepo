<template>
  <BasicCascader
    v-model="value"
    :api="api"
    result-field="data"
    node-key="id"
    :props="{
      value: 'id',
      label: 'name',
      children: 'children',
      multiple: true,
    }"
    default-expand-all
    checkStrictly
  />
  <div>当前选中值：{{ value }}</div>
</template>

<script setup lang="ts">
import { BasicCascader } from "@center/components";

const value = ref();

const api = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "响应成功",
        data: [
          {
            id: 7874,
            parentId: 6707,
            name: "广东事业部",
            children: [
              {
                id: 8687,
                parentId: 7874,
                name: "佛山大区",
                children: [
                  { id: 9537, parentId: 8687, name: "三海服务处" },
                  { id: 9548, parentId: 8687, name: "顺德北服务处" },
                ],
              },
              {
                id: 8757,
                parentId: 7874,
                name: "深圳大区",
                children: [
                  { id: 9613, parentId: 8757, name: "龙岗服务处" },
                  { id: 9627, parentId: 8757, name: "龙华服务处" },
                ],
              },
            ],
          },
          {
            id: 10874,
            parentId: 6706,
            name: "广西事业部",
            children: [
              {
                id: 10904,
                parentId: 10874,
                name: "南宁大区",
                children: [
                  { id: 10905, parentId: 10904, name: "百色服务处" },
                  { id: 10909, parentId: 10904, name: "田东服务处" },
                ],
              },
              {
                id: 10925,
                parentId: 10874,
                name: "桂北大区",
                children: [
                  { id: 10931, parentId: 10925, name: "贺州服务处" },
                  { id: 10934, parentId: 10925, name: "梧州服务处" },
                ],
              },
            ],
          },
        ],
      });
    }, 1000);
  });
};
</script>
