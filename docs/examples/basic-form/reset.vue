<template>
  <BasicForm @submit="handleSubmit" @register="registerForm" hasFooter />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";
import department from "../../mocks/department.json";

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    component: "input",
    defaultValue: "李华",
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
    defaultValue: "football",
  },
  {
    label: "入职日期",
    prop: "joinDay",
    component: "date-picker",
  },
  {
    label: "手机",
    prop: "phone",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "苹果", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
  },
  {
    label: "部门",
    prop: "department",
    component: "tree-select",
    componentProps: {
      data: department,
      props: { value: "id", label: "name", children: "children" },
    },
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const handleSubmit = () => {};
</script>
