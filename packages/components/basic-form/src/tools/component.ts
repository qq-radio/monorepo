import type { ComponentType } from "../types";
import {
  ElInput,
  ElInputNumber,
  ElDatePicker,
  ElTimePicker,
  ElCascader,
  ElSwitch,
  ElRate,
  ElSlider,
  ElColorPicker,
} from "element-plus";
import { BasicRadioGroup } from "@center/components/basic-radio";
import { BasicCheckboxGroup } from "@center/components/basic-checkbox";
import { BasicSelect } from "@center/components/basic-select";
import { BasicTreeSelect } from "@center/components/basic-tree-select";
import { BasicCascader } from "@center/components/basic-cascader";
import type { Component } from "vue";

const componentMap = new Map<ComponentType, Component>();

componentMap.set("input", ElInput);
componentMap.set("input-number", ElInputNumber);
componentMap.set("textarea", ElInput);
componentMap.set("radio", BasicRadioGroup);
componentMap.set("checkbox", BasicCheckboxGroup);
componentMap.set("select", BasicSelect);
componentMap.set("tree-select", BasicTreeSelect);
componentMap.set("cascader", BasicCascader);
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
