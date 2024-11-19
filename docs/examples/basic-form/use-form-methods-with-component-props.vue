<template>
  <BasicForm
    v-model="model"
    @register="registerForm"
    @submit="submit"
    hasFooter
  />
</template>

<script lang="tsx" setup>
import { BasicForm, useForm, FormSchema } from "@center/components/basic-form";

import { ref } from "vue";

const model = ref({});

const schemas: FormSchema[] = [
  {
    label: "用户",
    prop: "username",
    component: "input",
    required: true,
  },
  {
    label: "礼物",
    prop: "gift",
    component: "radio-group",
    required: true,
    componentProps: ({
      value,
      methods: {
        setFieldsValue,
        appendSchema,
        updateSchema,
        getFieldValue,
        getFieldsValue,
        validate,
        validateField,
      },
    }) => {
      return {
        options: [
          { label: "手机", value: "phone" },
          { label: "电脑", value: "computer" },
        ],
        onClick: () => {
          value === "phone"
            ? setFieldsValue({
                computerBrand: "",
              })
            : setFieldsValue({
                phoneBrand: "",
              });

          appendSchema(
            {
              label: "充电线",
              prop: "service",
              component: "radio-group",
              componentProps: {
                options: [
                  { label: "快充", value: "fast" },
                  { label: "慢充", value: "slow" },
                ],
              },
            },
            "gift"
          );

          value === "phone"
            ? updateSchema(
                {
                  label: "手机品牌11",
                  prop: "phoneBrand",
                  component: "select",
                  componentProps: {
                    options: [
                      { label: "苹果1111", value: "iphone" },
                      { label: "小米1111", value: "xiaomi" },
                      { label: "华为111", value: "huawei" },
                    ],
                  },
                },
                "gift"
              )
            : updateSchema(
                {
                  label: "电脑品牌222",
                  prop: "computerBrand",
                  component: "select",
                  componentProps: {
                    options: [
                      { label: "联想2222", value: "lenovo" },
                      { label: "惠普2222", value: "hp" },
                      { label: "戴尔222222", value: "dell" },
                    ],
                  },
                },
                "gift"
              );

          const gift = getFieldValue("gift");
          const values = getFieldsValue();
          // console.log("form gift:", gift);
          // console.log("form values:", values);

          setFieldsValue({
            phoneBrand: "xiaomi",
            computerBrand: "hp",
          });

          validate();
          // validateField("username");
        },
      };
    },
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
    required: true,
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
    required: true,
  },
];

const [registerForm] = useForm({
  schemas,
  labelWidth: "180px",
});

const submit = () => {};
</script>
