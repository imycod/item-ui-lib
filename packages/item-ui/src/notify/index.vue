<template>
  <div :class="cls">
    <el-popover
      :popper-class="cls"
      placement="bottom-end"
      :show-arrow="false"
      :width="508"
      trigger="click"
      :offset="16"
      v-bind="$attrs"
    >
      <template #reference>
        <span :class="[c('bell'), c('bell', cm('hover'))]">
          <span
            :style="{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: bellLineSpace,
            }"
          >
            <span
              v-show="notifyList.length"
              :class="c('bell', ce('badge'))"
            ></span>
            <notifyIcon :class="c('bell', ce('icon'))" />
          </span>
        </span>
      </template>
      <!-- 切换 -->
      <div :class="c('tab')">
        <span
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(item)"
          :class="[
            c('tab', ce('item')),
            currentTab.key == item.key
              ? c('tab', ce('item'), cm('active'))
              : '',
          ]"
        >
          <span :class="c('tab', ce('item-label'))">{{ item.label }}</span>
          <span
            :class="c('tab', ce('item-badge'))"
            v-if="notifyListGroup[item.key].length"
          >
            <span>{{
              notifyListGroup[item.key].length > 99
                ? "99+"
                : notifyListGroup[item.key].length
            }}</span>
          </span>
        </span>
      </div>
      <!-- 通知内容 -->
      <div :class="c('content')">
        <div
          v-for="(item, index) in currentNotifyList"
          :key="index"
          :class="c('content', ce('item'))"
        >
          <span :class="c('content', ce('item-badge'))"></span>
          <div :class="c('content', ce('item-content'))">
            <span :class="c('content', ce('item-creator-logo'))">
              {{ getFname(item.createName) || "-" }}
            </span>
            <div :class="c('content', ce('item-detail'))">
              <div :class="c('content', ce('item-detail-title'))">
                {{ item.title || "-" }}
              </div>
              <div :class="c('content', ce('item-detail-info'))">
                {{ item.description || "-" }}
              </div>
            </div>
          </div>
          <span :class="c('content', ce('item-time'))">
            {{ formatCustomDate(item.createWhen) || "-" }}
          </span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { useClassname } from "../utils/use-classname";
import notifyIcon from "./assets/notify.svg";

const props = defineProps({
  showHoverBellLine: {
    type: Boolean,
    default: true,
  },
  bellLineSpace: {
    type: String,
    default: "10px",
  },
  tabList: {
    type: Array,
    default: () => [
      {
        label: "Notification",
        key: "other",
      },
      {
        label: "Alert",
        key: "SYSTEM_ALERT",
      },
      {
        label: "To-do",
        key: "TODO",
      },
    ],
  },
  notifyList: {
    type: Array,
    default: () => [
      {
        id: "1",
        title: "test",
        description: "aaa+bb+ccc",
        createName: "zhang han",
        notificationType: "RELEASE_NOTE",
        createWhen: "2024-08-08T01:51:08.365",
      },
      {
        id: "2",
        title: "test2",
        description: "aaa+bb+ccc+ddd",
        createName: "wuxing shi",
        notificationType: "RELEASE_NOTE",
        createWhen: "2024-08-09T01:51:08.365",
      },
      {
        id: "3",
        title: "test3",
        description: "aaa+bb+ccc+ddd",
        createName: "wuxingshi",
        notificationType: "SYSTEM_ALERT",
        createWhen: "2024-07-06T01:51:08.365",
      },
      {
        id: "4",
        title: "test4",
        description: "aaa+bb+ccc+ddd",
        createName: "wuxingshi",
        notificationType: "TODO",
        createWhen: "2024-05-03T01:51:08.365",
      },
    ],
  },
});

const { cx, c, ce, cm } = useClassname("notify");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});

const currentTab = ref(props.tabList[0] || {});

let notifyListGroup: any = ref({});
let currentNotifyList: any = ref([]);

// 消息分类
const groupNotifyList = () => {
  const obj: any = {};
  props.tabList.forEach((item: any) => {
    obj[item.key] = obj[item.key] || [];
    props.notifyList.forEach((subItem: any) => {
      const hasInTab =
        props.tabList.find((tab) => tab.key === subItem.notificationType) ||
        false;
      // 符合tab类型的消息放到对应tab
      if (item.key === subItem.notificationType) {
        obj[item.key].push(subItem);
      } else if (item.key === "other" && !hasInTab) {
        obj["other"].push(subItem);
      }
    });
  });

  console.log("obj", obj);

  notifyListGroup.value = obj;
};

const changeTab = (tabInfo: any) => {
  currentTab.value = tabInfo;

  // 根据选择的tab，过滤出对应的通知列表
  currentNotifyList.value = notifyListGroup.value[tabInfo.key];
};

// 监听notifyList传入触发一次过滤
watch(
  () => props.notifyList,
  () => {
    // 对数据进行分类整理
    groupNotifyList();
    // 手动触发选项卡切换数据
    changeTab(currentTab.value);
  },
  { immediate: true }
);

const formatCustomDate = (dateString: string) => {
  // 自定义月份映射
  const monthMap: any = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "Apiri", // April 的自定义名称
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const date = dayjs(dateString);

  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  if (date.isSame(today, "day")) {
    return "Today";
  }

  if (date.isSame(yesterday, "day")) {
    return "LastDay";
  }

  const day = date.format("D");
  const month = monthMap[date.format("MM")];
  const year = date.format("YYYY");

  return `${day} ${month} ${year}`;
};

const getFname = (name: any) => {
  if (!name) return;
  const userView = {
    firstName: name.split(" ")[0] || "",
    lastName: name.split(" ")[1] || "",
  };

  let fname = "";
  if (userView.firstName) {
    fname += userView.firstName.charAt(0).toUpperCase();
  }
  if (userView.lastName) {
    fname += userView.lastName.charAt(0).toUpperCase();
  }
  return fname;
};
</script>
