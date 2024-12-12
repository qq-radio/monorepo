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
        v-model="formModel"
        :schemas="formSchemas"
        hasFooter
        @submit="handleSubmit"
        @submit-error="handleSubmitError"
      />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import {
  BasicForm,
  FormSchema,
  BasicButtonGroup,
  Button,
  BasicFormInstance,
} from "@center/components";

import { ref } from "vue";

const activeNames = ref(["example", "data"]);

const basicFormRef = ref<BasicFormInstance>();

const formModel = ref();

const formSchemas: FormSchema[] = [
  {
    label: "产品",
    prop: "product",
    component: "select",
    componentProps: {
      options: [
        { label: "农夫山泉茶π", value: "nongfu_tea_pi" },
        { label: "百事无糖可乐", value: "pepsi_no_sugar" },
        { label: "康师傅阿萨姆奶茶", value: "kang_shi_fu_tea" },
      ],
    },
    defaultValue: "nongfu_tea_pi",
    required: true,
  },
  {
    label: "活动类型",
    prop: "activityType",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "满减", value: "fullDiscount" },
        { label: "满赠", value: "fullGift" },
      ],
    },
    required: true,
  },
  {
    label: "满减券",
    prop: "discountCoupon",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "满200-30", value: "discount_200_30" },
        { label: "满300-50", value: "discount_300_50" },
      ],
    },
  },
  {
    label: "满赠券",
    prop: "giftCoupon",
    component: "radio-group",
    componentProps: {
      options: [
        { label: "买三赠一", value: "buy_3_get_1" },
        { label: "买五赠二", value: "buy_5_get_2" },
      ],
    },
  },
];

const buttons: Button[] = [
  {
    text: "setProps",
    onClick: () => {
      basicFormRef.value!.setProps({
        colProps: {
          span: 10,
        },
      });
    },
  },
  {
    text: "submit",
    onClick: () => {
      basicFormRef
        .value!.submit()
        .then((values) => {
          console.log("表单填写值:", values);
        })
        .catch((error) => {
          console.error("表单提交错误:", error);
        });
    },
  },
  {
    text: "reset",
    onClick: () => {
      basicFormRef.value!.reset();
    },
  },
  {
    text: "updateSchema",
    onClick: () => {
      basicFormRef.value!.updateSchema([
        {
          prop: "discoduntCoupon",
          required: true,
        },
        {
          prop: "giftCoupon",
          required: true,
        },
      ]);
    },
  },
  {
    text: "appendSchema",
    onClick: () => {
      basicFormRef.value!.appendSchema(
        {
          label: "是否叠加代金券",
          prop: "isVoucherStackable",
          component: "switch",
        },
        "giftCoupon"
      );
    },
  },
  {
    text: "removeSchema",
    onClick: () => {
      basicFormRef.value!.removeSchema("isVoucherStackable");
    },
  },

  {
    text: "getFieldValue",
    onClick: () => {
      const activityType = basicFormRef.value!.getFieldValue("activityType");
      console.log("activityType:", activityType);
    },
  },
  {
    text: "getFieldsValue",
    onClick: () => {
      const values = basicFormRef.value!.getFieldsValue();
      console.log("values:", values);
    },
  },
  {
    text: "setFieldsValue",
    onClick: () => {
      basicFormRef.value!.setFieldsValue({ activityType: "fullDiscount" });
    },
  },
  {
    text: "validate",
    onClick: () => {
      basicFormRef.value!.validate();
    },
  },
  {
    text: "validateField",
    onClick: () => {
      basicFormRef.value!.validateField("activityType");
    },
  },
  {
    text: "resetFields",
    onClick: () => {
      basicFormRef.value!.resetFields();
    },
  },
  {
    text: "scrollToField",
    onClick: () => {
      basicFormRef.value!.scrollToField("activityType");
    },
  },
  {
    text: "clearValidate",
    onClick: () => {
      basicFormRef.value!.clearValidate();
    },
  },
];

const handleSubmit = (values) => {
  console.log("handleSubmit:", values);
};

const handleSubmitError = (error) => {
  console.log("handleSubmitError:", error);
};
</script>
