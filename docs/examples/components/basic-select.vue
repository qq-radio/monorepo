<template>
  <h5>数据收集之BasicSelect</h5>
  <br />

  <CollectContainer>
    <template #desc>基本使用</template>
    <template #value>{{ selectedTech }}</template>
    <BasicSelect
      v-model="selectedTech"
      filterable
      :options="[
        { label: '苹果', value: 'iphone' },
        { label: '小米', value: 'xiaomi' },
        { label: '华为', value: 'huawei', disabled: true },
      ]"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >可传入hasCheckAll控制全选，若hasCheckAll为true，则自动为多选（即multiple此时为true）</template
    >
    <template #value>{{ selectedCourses }}</template>
    <BasicSelect
      v-model="selectedCourses"
      hasCheckAll
      :options="[
        { label: '计算机科学', value: 'computer' },
        { label: '心理学', value: 'psychology' },
        { label: '经济学', value: 'economics' },
      ]"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >默认v-model接收的值为选中的values数组，如果希望拿到除了values
      之外的其它内容，应监听change事件</template
    >
    <template #value>
      <div>{{ selectedHobbies }}</div>
      <div>{{ selectedHobbyDetails }}</div>
    </template>
    <BasicSelect
      v-model="selectedHobbies"
      multiple
      :options="[
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '旅游', value: 'travel' },
      ]"
      @change="({ options }) => (selectedHobbyDetails = options)"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >若选项数据来自后端接口，请传入api，且可传入resultField、labelField、valueField自动构建options</template
    >
    <template #value>{{ selectedCities }}</template>
    <BasicSelect
      v-model="selectedCities"
      v-bind="{
        resultField: 'result',
        labelField: 'province',
        valueField: 'id',
      }"
      :api="fetchCityOptions"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc
      >可传formatter函数对每一项option进一步处理成希望展示的数据</template
    >
    <template #value>{{ selectedRegions }}</template>
    <BasicSelect
      v-model="selectedRegions"
      multiple
      :formatter="
        (option) => ({
          ...option,
          label: `${option.province}/${option.city}/${option.region}`,
          value: option.code,
        })
      "
      :options="regionOptions"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc>更灵活的渲染：customRender渲染、customSlot渲染</template>
    <template #value>{{ selectedFruits }}</template>
    <BasicSelect v-model="selectedFruits" :options="fruitOptions">
      <template #slot-apple="{ option }">
        <span style="color: green; display: flex; align-items: center">
          <el-icon><Watermelon /></el-icon>🍏{{ option.label }}
        </span>
      </template>
    </BasicSelect>
  </CollectContainer>

  <CollectContainer>
    <template #desc>自定义模板 customRender</template>
    <template #value>{{ selectedDrinks }}</template>
    <BasicSelect
      v-model="selectedDrinks"
      :options="[
        { label: '咖啡', value: 'coffee' },
        { label: '牛奶', value: 'milk_tea' },
        { label: '果汁', value: 'juice' },
      ]"
      :render="customDrinkRender"
    />
  </CollectContainer>

  <CollectContainer>
    <template #desc>自定义模板 default slot</template>
    <template #value>{{ selectedFestivals }}</template>
    <BasicSelect
      v-model="selectedFestivals"
      :options="festivalOptions"
      multiple
    >
      <template #default="{ option }">
        <span style="display: flex; align-items: center">
          <el-icon style="margin-right: 8px"><Calendar /></el-icon>
          {{ option.label }} ({{ option.date }})
        </span>
      </template>
    </BasicSelect>
  </CollectContainer>
</template>

<script setup lang="tsx">
import { BasicSelect, CheckboxOption } from "@center/components";
import CollectContainer from "../CollectContainer.vue";
import {
  Grape,
  Watermelon,
  IceDrink,
  Orange,
  Calendar,
} from "@element-plus/icons-vue";

const selectedCities = ref();
const selectedRegions = ref();
const selectedHobbies = ref();
const selectedTech = ref();
const selectedCourses = ref();
const selectedFruits = ref();
const selectedDrinks = ref();
const selectedFestivals = ref();

const selectedHobbyDetails = ref();

const festivalOptions = [
  { label: "春节", value: "spring_festival", date: "正月初一" },
  { label: "端午节", value: "dragon_boat_festival", date: "五月初五" },
  { label: "中秋节", value: "mid_autumn_festival", date: "八月十五" },
];

const fruitOptions: CheckboxOption = [
  {
    label: "葡萄",
    value: "grape",
    customRender: ({ option }) => (
      <span style="color: purple;display:flex; align-items:center">
        <el-icon>
          <Grape />
        </el-icon>
        {option.label}
      </span>
    ),
  },
  {
    label: "苹果",
    value: "apple",
    customSlot: "slot-apple",
  },
  {
    label: "橘子",
    value: "orange",
    customRender: ({ option }) => (
      <span style="color:orange;display:flex; align-items:center">
        <el-icon>
          <Orange />
        </el-icon>
        {option.label}
      </span>
    ),
  },
];

const fetchCityOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "响应成功",
        result: [
          { province: "北京", id: "beijing" },
          { province: "上海", id: "shanghai" },
          { province: "广州", id: "guangzhou" },
          { province: "深圳", id: "shenzhen" },
        ],
      });
    }, 1000);
  });
};

const regionOptions = [
  { province: "福建", city: "泉州", region: "鲤城区", code: "li_cheng" },
  { province: "广东", city: "深圳", region: "南山区", code: "nan_shan" },
  { province: "广东", city: "深圳", region: "龙岗区", code: "long_gang" },
];

const customDrinkRender = ({ option }) => (
  <span style="display: flex; align-items: center">
    <el-icon>
      <IceDrink />
    </el-icon>
    <span style="margin-left: 8px">{option.label}</span>
  </span>
);
</script>
