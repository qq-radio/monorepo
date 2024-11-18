<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm
        v-model="formModel"
        @register="registerForm"
        @submit="handleSubmit"
        hasFooter
      />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";
import department from "../../mocks/department.json";

import { ref } from "vue";

const activeNames = ref(["example"]);

const formModel = ref({
  username: "李华",
  age: 18,
  remark: "这是一段说明",
});

const schemas: FormSchema[] = [
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
    label: "备注",
    prop: "remark",
    component: "textarea",
    required: true,
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
    required: true,
  },
  {
    label: "是否全职",
    prop: "fruit",
    component: "checkbox",
    required: true,
  },
  {
    label: "水果",
    prop: "fruit",
    component: "checkbox-group",
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
    required: true,
  },
  {
    label: "部门",
    prop: "department",
    component: "tree-select",
    componentProps: {
      data: department,
      props: { value: "id", label: "name", children: "children" },
    },
    required: true,
  },
  {
    label: "服务处",
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
    label: "入职日期",
    prop: "joinDay",
    component: "date-picker",
    required: true,
  },
  {
    label: "入职时间",
    prop: "joinTime",
    component: "time-picker",
    required: true,
  },
  {
    label: "是否全职",
    prop: "isFull",
    component: "switch",
    defaultValue: 0,
    required: true,
  },
  {
    label: "绩效评分",
    prop: "score",
    component: "rate",
    required: true,
  },
  {
    label: "技能分",
    prop: "skill",
    component: "slider",
    required: true,
  },
  {
    label: "喜爱颜色",
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
