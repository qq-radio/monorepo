<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicButtonGroup
        :buttons="buttons"
        :buttonProps="{ type: 'default' }"
        style="margin-bottom: 20px"
      />
      <BasicForm
        ref="basicFormRef"
        v-model="model"
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
import {
  BasicForm,
  FormSchema,
  BasicButtonGroup,
  Button,
} from "@center/components";

import { ref } from "vue";

const activeNames = ref(["example"]);

const basicFormRef = ref();

const model = ref({
  username: "韩梅梅",
});

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    required: true,
  },
  {
    label: "语言",
    prop: "language",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "前端", value: "frontend" },
        { label: "后端", value: "backend" },
      ],
    },
    required: true,
  },
  {
    label: "前端语言",
    prop: "frontendLanguage",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "JavaScript", value: "javaScript" },
        { label: "TypeScript", value: "typescript" },
      ],
    },
    required: true,
  },
  {
    label: "后端语言",
    prop: "backendLanguage",
    component: "checkbox-group",
    componentProps: {
      options: [
        { label: "Python", value: "python" },
        { label: "Go", value: "go" },
        { label: "Java", value: "java" },
      ],
    },
    required: true,
  },
];

const buttons: Button[] = [
  {
    text: "setProps",
    onClick: () => {
      basicFormRef.value.setProps({
        colProps: {
          span: 10,
        },
      });
    },
  },
  {
    text: "submit",
    onClick: () => {
      basicFormRef.value.submit();
    },
  },
  {
    text: "reset",
    onClick: () => {
      basicFormRef.value.reset();
    },
  },
  {
    text: "updateSchema",
    onClick: () => {
      basicFormRef.value.updateSchema({
        prop: "backendLanguage",
        componentProps: {
          options: [
            { label: "C", value: "c" },
            { label: "C++", value: "c++" },
            { label: "Ruby", value: "ruby" },
          ],
        },
      });
    },
  },
  {
    text: "removeSchema",
    onClick: () => {
      basicFormRef.value.removeSchema("tool");
    },
  },
  {
    text: "appendSchema",
    onClick: () => {
      basicFormRef.value.appendSchema(
        {
          label: "工具",
          prop: "tool",
          component: "select",
          componentProps: {
            options: [
              { label: "Visual Studio", value: "vscode" },
              { label: "IntelliJ IDEA", value: "idea" },
              { label: "Eclipse", value: "eclipse" },
            ],
          },
        },
        "backendLanguage"
      );
    },
  },
  {
    text: "getFieldValue",
    onClick: () => {
      const language = basicFormRef.value.getFieldValue("tool");
      console.log("getFieldValue language:", language);
    },
  },
  {
    text: "getFieldsValue",
    onClick: () => {
      const values = basicFormRef.value.getFieldsValue();
      console.log("getFieldsValue values:", values);
    },
  },
  {
    text: "setFieldsValue",
    onClick: () => {
      basicFormRef.value.setFieldsValue({ language: "frontend" });
    },
  },
  {
    text: "resetFieldsValue",
    onClick: () => {
      basicFormRef.value.resetFieldsValue();
    },
  },
  {
    text: "validate",
    onClick: () => {
      basicFormRef.value.validate();
    },
  },
  {
    text: "validateField",
    onClick: () => {
      basicFormRef.value.validateField("language");
    },
  },
  {
    text: "resetFields",
    onClick: () => {
      basicFormRef.value.resetFields();
    },
  },
  {
    text: "scrollToField",
    onClick: () => {},
  },
  {
    text: "clearValidate",
    onClick: () => {
      basicFormRef.value.clearValidate();
    },
  },
];
</script>
