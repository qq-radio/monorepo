<template>
  表单填写值{{ model }}
  <BasicForm
    v-model="model"
    @submit="handleSubmit"
    @register="registerForm"
    hasFooter
  />
</template>

<script lang="ts" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";
import department from "../../mocks/department.json";

import { ref } from "vue";

const model = ref<Recordable>({
  username: "李华",
  age: 18,
  remark: "这是一段说明",
});

const schemas: FormSchema[] = [
  {
    label: "input-用户",
    prop: "username",
    required: true,
  },
  {
    label: "input-number-年龄",
    prop: "age",
    component: "input-number",
    required: true,
  },
  {
    label: "textarea-备注",
    prop: "remark",
    component: "textarea",
    required: true,
  },
  {
    label: "radio-手机",
    prop: "phone",
    component: "radio",
    componentProps: {
      options: [
        { label: "苹果", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
    required: true,
  },
  {
    label: "checkbox-水果",
    prop: "fruit",
    component: "checkbox",
    componentProps: {
      options: [
        { label: "葡萄", value: "grape" },
        { label: "苹果", value: "apple" },
        { label: "橘子", value: "orange" },
      ],
    },
    required: true,
  },
  {
    label: "select-运动",
    prop: "sport",
    component: "select",
    componentProps: {
      options: [
        { label: "足球", value: "football" },
        { label: "篮球", value: "basketball" },
        { label: "羽毛球", value: "badminton" },
      ],
    },
    required: true,
  },
  // {
  //   label: "先放着 我不知道这个我为什么会有问题？？tree-select-部门",
  //   prop: "department",
  //   component: "tree-select",
  //   componentProps: {
  //     data: department,
  //     props: { label: "name", children: "children" },
  //   },
  //   required: true,
  // },
  {
    label: "cascader-服务处",
    prop: "service",
    component: "cascader",
    componentProps: {
      options: department,
      props: {
        value: "id",
        label: "name",
        children: "children",
        multiple: true,
      },
    },
    required: true,
  },
  {
    label: "date-picker-入职日期",
    prop: "joinDay",
    component: "date-picker",
    required: true,
  },
  {
    label: "time-picker-入职时间",
    prop: "joinTime",
    component: "time-picker",
    required: true,
  },
  {
    label: "switch-是否全职",
    prop: "isFull",
    component: "switch",
    defaultValue: 0,
    required: true,
  },
  {
    label: "rate-绩效评分",
    prop: "score",
    component: "rate",
    required: true,
  },
  {
    label: "slider-技能分",
    prop: "skill",
    component: "slider",
    required: true,
  },
  {
    label: "color-picker-喜爱颜色",
    prop: "color",
    component: "color-picker",
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const handleSubmit = () => {};
</script>
