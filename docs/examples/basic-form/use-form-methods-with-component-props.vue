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
    onClick: () => {},
  },
  {
    text: "reset",
    onClick: () => {},
  },
  {
    text: "updateSchema",
    onClick: () => {},
  },
  {
    text: "removeSchema",
    onClick: () => {},
  },
  {
    text: "appendSchema",
    onClick: () => {
      const item = {
        label: "充电线",
        prop: "cable",
        component: "radio-group",
        componentProps: {
          options: [
            { label: "快充", value: "fast" },
            { label: "慢充", value: "slow" },
          ],
        },
      };

      basicFormRef.value.appendSchema(item, "gift");
    },
  },
  {
    text: "getFieldValue",
    onClick: () => {},
  },
  {
    text: "getFieldsValue",
    onClick: () => {},
  },
  {
    text: "setFieldsValue",
    onClick: () => {},
  },
  {
    text: "resetFieldsValue",
    onClick: () => {},
  },
  {
    text: "validate",
    onClick: () => {},
  },
  {
    text: "validateField",
    onClick: () => {},
  },
  {
    text: "resetFields",
    onClick: () => {},
  },
  {
    text: "scrollToField",
    onClick: () => {},
  },
  {
    text: "clearValidate",
    onClick: () => {},
  },
];

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    required: true,
  },
  {
    label: "礼物",
    prop: "gift",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "手机", value: "phone" },
        { label: "电脑", value: "computer" },
      ],
    },
    required: true,
  },
  {
    label: "手机品牌",
    prop: "phoneBrand",
    component: "select",
    componentProps: {
      options: [
        { label: "苹果", value: "iphone" },
        { label: "小米", value: "xiaomi" },
        { label: "华为", value: "huawei" },
      ],
    },
  },
  {
    label: "电脑品牌",
    prop: "computerBrand",
    component: "select",
    componentProps: {
      options: [
        { label: "联想", value: "lenovo" },
        { label: "惠普", value: "hp" },
        { label: "戴尔", value: "dell" },
      ],
    },
  },
];
</script>
