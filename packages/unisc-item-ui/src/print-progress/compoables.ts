/* eslint-disable */
// @ts-nocheck
import { reactive, watch, ref, isRef, readonly, onUnmounted } from "vue";
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

  onUnmounted(() => {
    isExpand.value = null;
  });
  return [isExpand, expand];
}

const intervalId = ref(0);

let progress = reactive({
  list: [],
  status: "padding",
  percentage: 0,
});
export function useProgressData(props, done = () => {}) {
  const fetchPrintStatus = async () => {
    try {
      // const response = await axios.get('/api/label-process');
      // const result = response.data;
      // if (result.status === 'done' || result.list.every(item => item.status === 1)) {
      // 	clearInterval(intervalId.value);
      // }
      // printObj.list = result.list;
      if (progress.percentage === 100) {
        progress.status = "done";
        stop();
        return;
      }
      progress.list.push(progress.list.length + 1);
      progress.percentage = (progress.list.length * 100) / 10;
      console.log("事件已经开始轮询了");
    } catch (error) {
      console.error("Failed to fetch print status:", error);
    }
  };

  function load() {
    clearInterval(intervalId.value);
    fetchPrintStatus();
    const duration = props.duration || 1000;
    intervalId.value = setInterval(fetchPrintStatus, props.duration);
  }

  function stop() {
    clearInterval(intervalId.value);
    intervalId.value = null;
    done && done(false);
  }

  function reset() {
    isExpand.value = false;
    progress.list = [];
    progress.status = "padding";
    progress.percentage = 0;
  }

  onUnmounted(() => {
    stop();
    reset();
  });

  return [
    progress,
    {
      load,
      stop,
    },
  ];
}

export function useProgress({ emit, props }) {
  const isVisible = ref(false);

  let isOpenCache = null;
  function setStatus(value: boolean) {
    if (isOpenCache && isRef(isOpenCache)) {
      isOpenCache.value = value;
    }
    isVisible.value = value;
  }

  const [isExpand, expand] = useExpaned();
  const [progress, progressAction] = useProgressData(props, setStatus);

  function view() {
    expand();
    emit("view", !isExpand.value);
  }

  function open(isOpen) {
    isVisible.value = true;
    isOpenCache = isOpen;
    setStatus(isVisible.value);
    progressAction.load();
    return readonly(progress);
  }

  function abort() {
    isVisible.value = false;
    setStatus(isVisible.value);
    progressAction.stop();
    expand();
  }

  return {
    isVisible,
    progress,
    view,
    abort,
    open,
  };
}
