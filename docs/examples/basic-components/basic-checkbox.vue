<template>
  <h5>数据收集之BasicCheckbox多选</h5>
  <br />

  <!-- 基本使用 -->
  <CollectContainer>
    <template #desc>选择城市</template>
    <template #value>{{ state.selectedCities }}</template>
    <BasicCheckboxGroup
      v-model="state.selectedCities"
      v-bind="{ min: 2 }"
      :options="[
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ]"
    />
  </CollectContainer>

  <!-- 监听change事件，获取详细内容 -->
  <CollectContainer>
    <template #desc>兴趣爱好</template>
    <template #value>
      <div>{{ state.selectedHobbies }}</div>
      <div>{{ selectedHobbyDetails }}</div>
    </template>
    <BasicCheckboxGroup
      v-model="state.selectedHobbies"
      :options="hobbyOptions"
      @change="onHobbiesChange"
    />
  </CollectContainer>

  <!-- 选项值来自后端接口 -->
  <CollectContainer>
    <template #desc>选择科技产品</template>
    <template #value>{{ state.selectedTech }}</template>
    <BasicCheckboxGroup v-model="state.selectedTech" :api="fetchTechOptions" />
  </CollectContainer>

  <!-- 自定义字段 resultField、labelField、valueField -->
  <CollectContainer>
    <template #desc>选择书籍</template>
    <template #value>{{ state.selectedBooks }}</template>
    <BasicCheckboxGroup
      v-model="state.selectedBooks"
      :api="fetchBooksApi"
      v-bind="{
        resultField: 'books',
        labelField: 'title',
        valueField: 'isbn',
      }"
    />
  </CollectContainer>

  <!-- 灵活渲染 -->
  <CollectContainer>
    <template #desc>选择水果</template>
    <template #value>{{ state.selectedFruits }}</template>
    <BasicCheckboxGroup v-model="state.selectedFruits" :options="fruitOptions">
      <template #slot-apple="{ option }">
        <span style="color: green; display: flex; align-items: center">
          <el-icon><Watermelon /></el-icon> {{ option.label }} 🍏
        </span>
      </template>
    </BasicCheckboxGroup>
  </CollectContainer>

  <!-- 自定义模板 customRender -->
  <CollectContainer>
    <template #desc>选择饮料</template>
    <template #value>{{ state.selectedDrinks }}</template>
    <BasicCheckboxGroup
      v-model="state.selectedDrinks"
      :options="drinkOptions"
      :render="customDrinkRender"
    />
  </CollectContainer>

  <!-- 默认插槽渲染 -->
  <CollectContainer>
    <template #desc>选择节日</template>
    <template #value>{{ state.selectedFestivals }}</template>
    <BasicCheckboxGroup
      v-model="state.selectedFestivals"
      :options="festivalOptions"
      is-button
    >
      <template #default="{ option }">
        <span style="display: flex; align-items: center">
          <el-icon style="margin-right: 8px"><Calendar /></el-icon>
          {{ option.label }} ({{ option.date }})
        </span>
      </template>
    </BasicCheckboxGroup>
  </CollectContainer>
</template>

<script setup lang="tsx">
import { BasicCheckboxGroup } from "@center/components";
import CollectContainer from "../CollectContainer.vue";
import { Watermelon, Calendar } from "@element-plus/icons-vue";

const state = ref({
  selectedCities: [],
  selectedHobbies: [],
  selectedTech: [],
  selectedBooks: [],
  selectedFruits: [],
  selectedDrinks: [],
  selectedFestivals: [],
});

const hobbyOptions = [
  { label: "阅读", value: "reading" },
  { label: "运动", value: "sports" },
  { label: "音乐", value: "music", border: true },
  { label: "旅游", value: "travel" },
];

const fruitOptions = [
  { label: "苹果", value: "apple", customSlot: "slot-apple" },
  { label: "橘子", value: "orange" },
  { label: "香蕉", value: "banana", disabled: true },
];

const drinkOptions = [
  { label: "咖啡", value: "coffee" },
  { label: "奶茶", value: "milk_tea" },
  { label: "果汁", value: "juice" },
];

const festivalOptions = [
  { label: "春节", value: "spring_festival", date: "正月初一" },
  { label: "端午节", value: "dragon_boat_festival", date: "五月初五" },
  { label: "中秋节", value: "mid_autumn_festival", date: "八月十五" },
];

const selectedHobbyDetails = ref();
const onHobbiesChange = ({ options }) => {
  selectedHobbyDetails.value = options;
};

const fetchTechOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: "iPhone", value: "iphone" },
        { label: "MacBook", value: "macbook" },
        { label: "iPad", value: "ipad" },
      ]);
    }, 1000);
  });
};

const fetchBooksApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        books: [
          { title: "《红楼梦》", isbn: "9781234567890" },
          { title: "《三国演义》", isbn: "9780987654321" },
        ],
      });
    }, 1000);
  });
};

const customDrinkRender = ({ option }) => (
  <span style="display: flex; align-items: center">
    <el-icon>
      <Watermelon />
    </el-icon>
    <span style="margin-left: 8px">{option.label}</span>
  </span>
);
</script>
