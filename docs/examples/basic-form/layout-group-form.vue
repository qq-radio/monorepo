<template>
  <BasicForm @submit="handleSubmit" @register="registerForm" hasFooter />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

const schemas: FormSchema[] = [
  {
    title: "基本信息",
  },
  {
    label: "用户",
    prop: "username",
    component: "input",
    required: true,
  },
  {
    label: "年龄",
    prop: "age",
    component: "input-number",
    required: true,
  },
  {
    title: "个人喜好",
  },
  {
    label: "手机",
    prop: "phone",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "樱桃", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
  },
  {
    label: "水果",
    prop: "fruit",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "葡萄", value: "grape" },
        { label: "樱桃", value: "cherry" },
        { label: "橘子", value: "orange" },
      ],
    },
  },
  {
    label: "运动",
    prop: "sport",
    component: "select",
    componentProps: {
      options: [
        { label: "足球", value: "football" },
        { label: "篮球", value: "basketball" },
        { label: "羽毛球", value: "badminton" },
      ],
    },
  },
  {
    title: "评价分数",
  },
  {
    label: "绩效评分",
    prop: "score",
    component: "rate",
    required: true,
  },
  {
    label: "技能评分",
    prop: "skill",
    component: "slider",
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
  colProps: {
    span: 10,
  },
  buttonColProps: {
    push: 18,
  },
});

const handleSubmit = () => {};
</script>
