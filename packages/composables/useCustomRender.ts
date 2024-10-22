import { getComponent, ComponentType } from "@center/components";
import { Slots, VNode, Component } from "vue";
import { isFunction } from "lodash";

type UseCustomRender = (context: {
  render?: (params: any) => VNode;
  slots?: Slots;
}) => {
  renderItem: RenderItem;
};

type Render = (() => string | VNode) | Component;

type RenderItem = (
  item: {
    customRender?: Function;
    customSlot?: string;
    component?: ComponentType;
    display?: string;
  },
  options?: {
    fallbackContent?: string;
    callbackParams?: { [key: string]: any };
  }
) => Render;

export const useCustomRender: UseCustomRender = (context) => {
  const { render, slots } = context;

  const renderItem: RenderItem = (
    item,
    { fallbackContent = "", callbackParams = {} } = {}
  ) => {
    console.log("renderItem 执行了吗:", item);

    const customRender = item.customRender;
    const customSlot = slots && item.customSlot && slots[item.customSlot];

    const component = item.component;
    // const display =  item . display

    const templateRender = render;
    const templateSlot = slots && slots.default;

    try {
      if (isFunction(customRender)) {
        return () => customRender(callbackParams);
      } else if (customSlot) {
        return () => customSlot(callbackParams);
      } else if (isFunction(templateRender)) {
        return () => templateRender(callbackParams);
      } else if (component && getComponent(component)) {
        return getComponent(component);
      } else if (templateSlot) {
        return () => templateSlot(callbackParams);
      } else {
        return () => fallbackContent;
      }
    } catch (error) {
      console.error("UseCustomRender renderItem error:", error);
      return () => "";
    }
  };

  return {
    renderItem,
  };
};
