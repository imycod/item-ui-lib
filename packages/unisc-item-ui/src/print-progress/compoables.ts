import { reactive, watch, ref } from "vue";
import { useDraggable } from "@vueuse/core";

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

const isExpand = ref(false);
export function useExpaned() {
  const expand = () => {
    isExpand.value = !isExpand.value;
  };
  return [isExpand, expand];
}

export function useProgress({ context, emit }) {
  const intervalId = ref(0);
  const isVisible = ref(false);

  // const [isExpand, expand] = context["expand"];
  const [isExpand, expand] = useExpaned();

  const fetchPrintStatus = async () => {
    try {
      // const response = await axios.get('/api/label-process');
      // const result = response.data;
      // if (result.status === 'done' || result.list.every(item => item.status === 1)) {
      // 	clearInterval(intervalId.value);
      // }
      // printObj.list = result.list;
      console.log("事件已经开始轮询了");
    } catch (error) {
      console.error("Failed to fetch print status:", error);
    }
  };

  async function view() {
    clearInterval(intervalId.value);
    expand();
    emit("view", !isExpand.value);
    fetchPrintStatus();
    intervalId.value = setInterval(fetchPrintStatus, 3000);
  }

  function abort() {
    isVisible.value = false;
    expand();
    clearInterval(intervalId.value);
  }

  return {
    isVisible,
    view,
    abort,
  };
}
