<template>
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div
        class="progress-bar-current"
        :style="{ width: currentWidth + '%', backgroundColor: currentColor }"
      >
        <span class="progress-text-left" v-if="!text">{{ current }}</span>
        <span class="progress-text-left" v-else>
          {{ $t(text, { count: current }) }}
        </span>
      </div>
      <div
        v-if="current < total"
        class="progress-bar-total"
        :style="{ width: totalWidth + '%', backgroundColor: totalColor }"
      >
        <span class="progress-text-right" v-if="!text">{{ total }}</span>
        <span class="progress-text-right" v-else>
          {{ $t(text, { count: total }) }}
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 30,
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentColor: "#FF8700", // 左边进度条的颜色
      totalColor: "#3BB64F", // 右边进度条的颜色
    };
  },
  computed: {
    currentWidth() {
      return (this.current / this.total) * 100;
    },
    totalWidth() {
      return 100 - this.currentWidth;
    },
  },
};
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-bar {
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 40px;
  overflow: hidden;
  background-color: #3bb64f; /* 设置一个默认背景色，解决中间的白色问题 */
  position: relative;
}

.progress-bar-current {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  height: 100%;
  font-size: 24px;
  font-weight: 600;
  padding-left: 30px; /* 左边内边距 */
  border-radius: 40px;
}

.progress-bar-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  height: 100%;
  font-size: 24px;
  font-weight: 600;
  padding-right: 50px; /* 右边内边距 */
}

.progress-text-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.progress-text-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
