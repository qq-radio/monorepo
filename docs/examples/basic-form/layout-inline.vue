<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm
        v-model="model"
        v-bind="formProps"
        :schemas="schemas"
        hasFooter
      />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ model }}
    </el-collapse-item>
  </el-collapse>
</template>
<script lang="tsx" setup>
import { BasicForm, FormSchema } from "@center/components/basic-form";

const activeNames = ref(["example"]);

const model = ref({});

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
    label: "绩效评分",
    prop: "score",
    component: "rate",
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    label: "技能评分",
    prop: "skill",
    component: "slider",
    required: true,
    colProps: {
      span: 24,
    },
  },
];

const formProps = {
  labelWidth: "80px",
  colProps: {
    span: 10,
  },
};
</script>
