import type { ComponentType } from "../types";
import {
  ElInput,
  ElInputNumber,
  ElDatePicker,
  ElTimePicker,
  ElCheckbox,
  ElCascader,
  ElTreeSelect,
  ElSwitch,
  ElRate,
  ElSlider,
  ElColorPicker,
} from "element-plus";
import { BasicRadioGroup } from "@center/components/basic-radio";
import { BasicSelect } from "@center/components/basic-select";
import type { Component } from "vue";

const componentMap = new Map<ComponentType, Component>();

componentMap.set("input", ElInput);
componentMap.set("input-number", ElInputNumber);
componentMap.set("textarea", ElInput);
componentMap.set("radio", BasicRadioGroup);
componentMap.set("checkbox", ElCheckbox);
componentMap.set("select", BasicSelect);
componentMap.set("tree-select", ElTreeSelect);
componentMap.set("cascader", ElCascader);
componentMap.set("date-picker", ElDatePicker);
componentMap.set("time-picker", ElTimePicker);
componentMap.set("switch", ElSwitch);
componentMap.set("rate", ElRate);
componentMap.set("slider", ElSlider);
componentMap.set("color-picker", ElColorPicker);

function getComponent(component?: ComponentType): Component {
  return componentMap.get(component || "input") || ElInput;
}

export { getComponent };
