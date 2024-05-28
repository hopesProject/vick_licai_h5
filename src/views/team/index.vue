<template>
  <div class="wrapper">
    <!-- <come-back :title="$t('我的团队')" /> -->
    <van-nav-bar :title="$t('团队')" left-arrow @click-left="onClickLeft" />
    <nav>
      <div
        v-for="item in navList"
        :key="item.id"
        :class="`nav-item ${navData === item.id ? 'nav-item-active' : ''}`"
        @click="setNav(item)"
      >
        {{ item.name }}
      </div>
    </nav>

    <div class="box-content">
      <van-pull-refresh
        :pulling-text="$t('下拉即可刷新...')"
        :loosing-text="$t('释放即可刷新...')"
        :loading-text="$t('加载中...')"
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('没有更多了')"
          :loading-text="$t('加载中...')"
          @load="onLoad"
        >
          <van-cell v-for="(item, index) in data" :key="item.id">
            <div class="item-box">
              <div class="left">
                <div>
                  <van-image
                    class="img"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <div>
                  <div class="name">Alexandra N</div>
                  <div class="id">ID 93847239</div>
                </div>
              </div>
              <div class="right">
                <svg-icon
                  class="font-svg"
                  style="margin-left: 10px"
                  :iconClass="index === 0 ? 'vipYoux1' : 'vipYoux'"
                />
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { queryUserLevel } from "@/api";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],
  computed: {
    navList() {
      return [
        {
          name: this.$t("一级成员"),
          id: 1,
        },
        {
          name: this.$t("二级成员"),
          id: 2,
        },
        {
          name: this.$t("三级成员"),
          id: 3,
        },
      ];
    },
  },
  data() {
    return {
      navData: 1,
      data: [{}, {}],
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    setNav(item) {
      this.navData = item.id;
      this.pageNum = 1;
      this.getList();
    },
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await queryUserLevel({
        level: this.navData,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      });
      if (isRefreshing) {
        this.refreshing = false;
      }
      this.loading = false;
      try {
        if (res?.status === 0) {
          if (pageNum !== 1) {
            // this.data = [...this.data, ...res.data.list];
          } else {
            // this.data = res.data.list;
          }
        }
        if (this.data.length >= res.data.total) {
          this.finished = true;
        }
      } catch (error) {
        this.finished = true;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 38px 30px 32px;
  gap: 20px; /* The space between the flex items */

  .nav-item {
    flex: 1;
    border-radius: 67px;
    opacity: 1;
    font-size: 24px;
    font-weight: bold;
    line-height: 35.38px;
    line-height: 88px;
    text-align: center;
    letter-spacing: -0.76px;
    font-feature-settings: "kern" on;
    color: #ff752f;
    background: #ffffff;
    height: 88px;
    transition: all 0.5s;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  }
  .nav-item-active {
    flex: 1.5;
    background: linear-gradient(273deg, #f44848 0%, #ff782d 103%);
    color: #ffffff;
  }
}

.box-content {
  padding: 60px 30px;
  .item-box {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .img {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      overflow: hidden;
      margin-right: 24px;
    }
    .name {
      font-size: 24px;
      font-weight: bold;
      line-height: 35.38px;
      color: #273c66;
    }
    .id {
      font-size: 24px;

      /* ID 93847239 */
      color: #757479;
    }
    .font-svg {
      font-size: 50px;
    }
  }
}

:deep(.van-cell) {
  border-radius: 32px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}
</style>