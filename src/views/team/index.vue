<template>
  <div class="wrapper">
    <!-- <come-back :title="$t('我的团队')" /> -->
    <van-nav-bar :title="$t('我的团队')" left-arrow @click-left="onClickLeft" />
    <div class="header">
      <div>团队凝聚力是做好事情的源头</div>
      <div>疑人勿用，用人勿疑</div>
      <div></div>
      <van-tabs v-model="active" class="box-tabs" line-height="0">
        <van-tab :title="$t('1级成员')" :name="1"></van-tab>
        <van-tab :title="$t('2级成员')" :name="2"></van-tab>
        <van-tab :title="$t('3级成员')" :name="3"></van-tab>
      </van-tabs>
    </div>
    <div class="box">
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
            <van-cell v-for="item in data" :key="item.id">
              <div class="item-box">
                <img
                  src="https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280"
                  alt=""
                />
                <div class="box-content-user">
                  <div>
                    <span>{{ item.phone }}</span>
                    <span>LV.1</span>
                  </div>
                  <div>ID：{{ item.code }}</div>
                </div>
              </div>
            </van-cell>
            <!-- <div slot="finished"></div> -->
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import { queryUserLevel } from "@/api";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],

  data() {
    return {
      active: 1,
    };
  },
  watch: {
    active(v) {
      this.pageNum = 1;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await queryUserLevel({
        level: this.active,
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
            this.data = [...this.data, ...res.data.list];
          } else {
            this.data = res.data.list;
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

.header {
  width: 100%;
  height: 400px;
  background-image: url("@/assets/team-bg.png");
  background-size: 100%;
  font-weight: 600;
  font-family: PingFangSC, PingFangSC-Semibold;
  padding: 0 40px;
  position: relative;

  > div:nth-child(1) {
    font-size: 40px;
    color: #ffffff;
    padding: 80px 0 20px 0px;
  }

  > div:nth-child(2) {
    font-size: 30px;
    color: #ffffff;
    padding-bottom: 40px;
  }

  > div:nth-child(3) {
    width: 68px;
    height: 5px;
    background: #efefef;
  }
}

.box-tabs {
  padding: 0 40px;
  position: absolute;
  bottom: -38px;
  left: 0;
  width: 100%;
  z-index: 100;

  :deep(.van-tabs__wrap) {
    border-radius: 40px;
    height: 88px;
    box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);

    .van-tab {
      font-size: 30px;
      color: #999999;

      .van-tab__text {
        height: 80px;
        line-height: 80px;
      }
    }

    .van-tab--active {
      margin: 4px;
      background: linear-gradient(0deg, #ff957c 0%, #ffba8b 100%), #ffffff;
      border-radius: 40px;
      color: #ffffff;
    }
  }
}

.box {
  flex: 1;
  overflow-y: auto;
}

.box-content {
  padding-top: 60px;

  .item-box {
    height: 152px;
    background: #ffffff;
    border-radius: 76px;
    box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);
    padding: 25px 60px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    > img {
      width: 98px;
      height: 98px;
      border-radius: 50%;
    }

    .box-content-user {
      flex: 1;
      padding-left: 40px;

      > div:nth-child(1) {
        display: flex;
        align-items: center;

        > span:nth-child(1) {
          font-size: 32px;
          font-weight: 400;
          color: #000000;
        }

        > span:nth-child(2) {
          width: 93px;
          height: 37px;
          background: rgba(255, 151, 124, 0.1);
          border-radius: 19px;
          font-size: 24px;
          color: #ff977e;
          text-align: center;
        }
      }

      > div:nth-child(2) {
        font-size: 24px;
        color: #999999;
      }
    }
  }
}
// ::v-deep .van-nav-bar__content {
//   background-color: transparent;
// }
// ::v-deep .van-nav-bar {
//   background-color: transparent;
// }
</style>