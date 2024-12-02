<template>
  <BasicDescription :data="data" :schemas="schemas" />
</template>

<script lang="tsx" setup>
import { BasicDescription, DescriptionSchema } from "@center/components";

import { ref } from "vue";

const data = ref({
  isEnable: true,
  isFull: true,
});

const schemas: DescriptionSchema[] = [
  {
    label: "用户",
    prop: "username",
  },
  {
    label: "年龄",
    prop: "age",
    component: "input-number",
  },
  {
    label: "备注",
    prop: "remark",
    component: "textarea",
  },
  {
    label: "岗位",
    prop: "job",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "产品经理", value: "product_manager" },
        { label: "开发", value: "developer" },
        { label: "测试", value: "tester" },
      ],
    },
  },
  {
    label: "是否生效",
    prop: "isEnable",
    component: "checkbox",
    componentSlots: {
      default: () => "已生效",
    },
  },
  {
    label: "工作",
    prop: "work",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "前端开发", value: "front_end_dev" },
        { label: "后端开发", value: "back_end_dev" },
        { label: "全栈", value: "full_dev" },
      ],
      hasCheckAll: true,
    },
  },
  {
    label: "省份",
    prop: "provinceId",
    component: "select",
    componentProps: {
      options: filterTreeByDepth(options, 1),
      labelField: "name",
      valueField: "id",
    },
  },
  {
    label: "城市",
    prop: "cityId",
    component: "tree-select",
    componentProps: {
      data: filterTreeByDepth(options, 2),
      props: {
        value: "id",
        label: "name",
        children: "children",
      },
    },
  },
  {
    label: "区域",
    prop: "regionId",
    component: "cascader",
    componentProps: {
      options: filterTreeByDepth(options, 3),
      props: {
        value: "id",
        label: "name",
        children: "children",
        multiple: true,
      },
    },
  },
  {
    label: "入职日期",
    prop: "joinDay",
    component: "date-picker",
  },
  {
    label: "入职时间",
    prop: "joinTime",
    component: "time-picker",
  },
  {
    label: "是否全职",
    prop: "isFull",
    component: "switch",
    defaultValue: 0,
  },
  {
    label: "绩效评分",
    prop: "performanceScore",
    component: "rate",
  },
  {
    label: "技能评分",
    prop: "skillScore",
    component: "slider",
  },
  {
    label: "颜色",
    prop: "color",
    component: "color-picker",
  },
];
</script>
