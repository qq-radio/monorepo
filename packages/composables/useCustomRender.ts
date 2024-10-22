import { isFunction } from "@center/utils";
import { Slots, VNode } from "vue";

type UseCustomRender = (context: {
  render?: (params: any) => VNode;
  slots?: Slots;
}) => {
  renderItem: RenderItem;
};

type Render = () => VNode;

type RenderItem = (
  item: { customRender?: Function; customSlot?: string },
  options: {
    fallbackContent?: string;
    callbackParams?: { [key: string]: any };
  }
) => Render;

export const useCustomRender: UseCustomRender = (context) => {
  const { render, slots } = context;

  const renderItem: RenderItem = (
    item,
    { fallbackContent, callbackParams }
  ) => {
    const customRender = item.customRender;
    const customSlot = slots && item.customSlot && slots[item.customSlot];
    const templateRender = render;
    const templateSlot = slots && slots.default;

    try {
      if (isFunction(customRender)) {
        return () => customRender(callbackParams);
      } else if (customSlot) {
        return () => customSlot(callbackParams);
      } else if (isFunction(templateRender)) {
        return () => templateRender(callbackParams);
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
