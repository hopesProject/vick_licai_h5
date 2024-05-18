<template>
  <van-tabbar v-model="active" :placeholder="true">
    <van-tabbar-item v-for="item in tabbar" :key="item.name" :to="item.to">
      <span class="gradient-text">{{ item.name }}</span>
      <template #icon="props">
        <img :src="props.active ? item.icon.active : item.icon.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  watch: {
    "$route.path"() {
      this.tabbar.map((item, index) => {
        if (item.to === this.$route.path) {
          this.active = index;
        }
      });
    },
  },
  computed: {
    tabbar() {
      return [
        {
          name: this.$t("首页"),
          to: "/",
          icon: {
            active: require("@/assets/home1.png"),
            inactive: require("@/assets/home.png"),
          },
        },
        {
          name: this.$t("团队"),
          to: "/team",
          icon: {
            active: require("@/assets/team1.png"),
            inactive: require("@/assets/team.png"),
          },
        },
        {
          name: this.$t("产品"),
          to: "/produc",
          icon: {
            active: require("@/assets/jr.png"),
            inactive: require("@/assets/jr.png"),
          },
        },
        {
          name: this.$t("评论"),
          // to: "/earnings-record",
          to: "/comment",
          icon: {
            active: require("@/assets/Classification1.png"),
            inactive: require("@/assets/Classification.png"),
          },
        },

        {
          name: this.$t("我的"),
          to: "/my",
          icon: {
            active: require("@/assets/my1.png"),
            inactive: require("@/assets/my.png"),
          },
        },
      ];
    },
  },
  data() {
    return {
      active: 0,
    };
  },

  created() {
    this.tabbar.map((item, index) => {
      if (item.to === this.$route.path) {
        this.active = index;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.gradient-text {
  font-size: 20px;
}

::v-deep .van-tabbar-item__icon {
  margin-bottom: 0;
}

::v-deep .van-tabbar-item__text {
  margin-top: 15px;
}

::v-deep .van-tabbar-item__icon {
  img {
    width: 39px;
    height: 39px;
  }
}

::v-deep .van-tabbar-item--active {
  /* 创建一个从红色到蓝色的线性渐变 */
  -webkit-background-clip: text;
  background-clip: text;
  background-image: none;
  background: linear-gradient(to right, #ff947c, #ffb98c);
  /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
  -webkit-background-clip: text;
  /*将设置的背景颜色限制在文字中*/
  -webkit-text-fill-color: transparent;
  /*给文字设置成透明*/
}

::v-deep .van-tabbar {
  height: 97px;
  background-color: #fff;
  box-shadow: 0px 0px 7px 0px rgba(229, 229, 229, 0.45);
}
</style>