<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicButtonGroup
        :buttons="buttons"
        :buttonProps="{ type: 'default' }"
        style="margin-bottom: 20px"
      />
      <BasicForm
        v-model="formModel"
        hasFooter
        @register="registerForm"
        @submit="handleSubmit"
        @submit-error="handleSubmitError"
      />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx" setup>
import {
  BasicForm,
  FormSchema,
  useForm,
  BasicButtonGroup,
  Button,
} from "@center/components";

import { ref } from "vue";

const activeNames = ref(["example", "data"]);

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

const [
  registerForm,
  {
    setProps,
    submit,
    reset,

    updateSchema,
    removeSchema,
    appendSchema,

    getFieldValue,
    getFieldsValue,
    setFieldsValue,

    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  },
] = useForm({
  schemas: formSchemas,
});

const buttons: Button[] = [
  {
    text: "setProps",
    onClick: () => {
      setProps({
        colProps: {
          span: 10,
        },
      });
    },
  },
  {
    text: "submit",
    onClick: () => {
      submit()
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
      reset();
    },
  },
  {
    text: "updateSchema",
    onClick: () => {
      updateSchema([
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
      appendSchema(
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
      removeSchema("isVoucherStackable");
    },
  },

  {
    text: "getFieldValue",
    onClick: () => {
      const activityType = getFieldValue("activityType");
      console.log("activityType:", activityType);
    },
  },
  {
    text: "getFieldsValue",
    onClick: () => {
      const values = getFieldsValue();
      console.log("values:", values);
    },
  },
  {
    text: "setFieldsValue",
    onClick: () => {
      setFieldsValue({ activityType: "fullDiscount" });
    },
  },
  {
    text: "validate",
    onClick: () => {
      validate();
    },
  },
  {
    text: "validateField",
    onClick: () => {
      validateField("activityType");
    },
  },
  {
    text: "resetFields",
    onClick: () => {
      resetFields();
    },
  },
  {
    text: "scrollToField",
    onClick: () => {
      scrollToField("activityType");
    },
  },
  {
    text: "clearValidate",
    onClick: () => {
      clearValidate();
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
