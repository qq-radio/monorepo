<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="示例" name="example">
      <BasicForm v-model="formModel" :schemas="formSchemas" hasFooter />
    </el-collapse-item>
    <el-collapse-item title="表单值" name="data">
      {{ formModel }}
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { BasicForm, FormSchema } from '@center/components'

const activeNames = ref(['example', 'data'])

const formModel = ref()

const formSchemas: FormSchema[] = [
  {
    label: '产品',
    prop: 'product',
    component: 'select',
    componentProps: {
      options: [
        { label: '农夫山泉茶π', value: 'nongfu_tea_pi' },
        { label: '百事无糖可乐', value: 'pepsi_no_sugar' },
        { label: '康师傅阿萨姆奶茶', value: 'kang_shi_fu_tea' },
      ],
    },
    defaultValue: 'nongfu_tea_pi',
    required: true,
  },
  {
    label: '活动类型',
    prop: 'activityType',
    component: 'radio-group',
    componentProps: ({ methods: { updateSchema } }) => {
      return {
        options: [
          { label: '满减', value: 'fullDiscount' },
          { label: '满赠', value: 'fullGift' },
        ],
        onChange: ({ value }) => {
          if (value === 'fullDiscount') {
            updateSchema({
              prop: 'discountCoupon',
              visible: true,
            })
            updateSchema({
              prop: 'giftCoupon',
              visible: false,
            })
          } else if (value === 'fullGift') {
            updateSchema({
              prop: 'discountCoupon',
              visible: false,
            })
            updateSchema({
              prop: 'giftCoupon',
              visible: true,
            })
          } else {
            updateSchema({
              prop: 'discountCoupon',
              visible: false,
            })
            updateSchema({
              prop: 'giftCoupon',
              visible: false,
            })
          }
        },
      }
    },
    required: true,
  },
  {
    label: '满减券',
    prop: 'discountCoupon',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: '满200-30', value: 'discount_200_30' },
        { label: '满300-50', value: 'discount_300_50' },
      ],
    },
    visible: false,
  },
  {
    label: '满赠券',
    prop: 'giftCoupon',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: '买三赠一', value: 'buy_3_get_1' },
        { label: '买五赠二', value: 'buy_5_get_2' },
      ],
    },
    visible: false,
  },
]
</script>
