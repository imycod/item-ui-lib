import { reactive, watch, ref } from "vue";
import { useDraggable } from '@vueuse/core'

export function useMyDraggable() {
  const el = ref<HTMLElement | null>(null);
  const initialValue = reactive({
    x: 0,
    y: 50,
    style: "",
  });
  const { style } = useDraggable(el, {
    initialValue: initialValue,
  });
  watch(style, (v) => {
    initialValue.style = v;
  });
  return {
    el,
    initialValue,
  };
}

export function useExpaned() {
  const isExpand = ref(false);
  const doSwitch = () => {
    isExpand.value = !isExpand.value;
  };
  return [isExpand, doSwitch];
}
