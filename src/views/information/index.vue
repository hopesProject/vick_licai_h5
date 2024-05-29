<template>
  <div class="xxiao">
    <van-nav-bar :title="$t('公告')" left-arrow @click-left="onClickLeft" />

    <div class="content-list">
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
          <van-cell
            v-for="item in data"
            :key="item.id"
            @click="$router.push(`/itemInformation?id=${item.id}`)"
          >
            <div class="list-item">
              <div class="right-box">
                <div class="flex justify-between">
                  <div class="flex header-box">
                    <van-image class="img-box" :src="item.img" />
                    <p>{{ item.title }}</p>
                  </div>
                </div>
                <div class="flex justify-between ddhb">
                  <p class="text-container" v-html="item.descText"></p>
                  <!-- <div class="hb">9</div> -->
                </div>
              </div>
            </div>
          </van-cell>
          <!-- <div slot="finished"></div> -->
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { queryNoteice } from "@/api";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],

  data() {
    return {
      xiaoxi1: require("@/assets/xiaoxi1.png"),
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await queryNoteice({
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
.xxiao {
  background-color: #fff;
  height: 100vh;
  width: 100%;
  .list-item {
    width: 100%;
    background-color: #fff;
    padding: 15px 18px;
    display: flex;
    font-size: 27px;
    font-weight: 500;
    color: #333333;
    .right-box {
      width: 100%;
    }
    .time {
      font-size: 24px;
      color: #999999;
    }
    .ddhb {
      font-size: 24px;
      color: #666666;
      margin-top: 16px;
      .hb {
        min-width: 30px;
        padding: 0 10px;
        height: 30px;
        background: #fe0101;
        color: #fff;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
      }
    }
    img {
      width: 90px;
      height: 90px;
      margin-right: 18px;
    }
  }
}
:deep(.van-hairline--bottom::after) {
  border: none;
}

.header-box {
  align-items: center;
  font-size: 30px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0px;

  color: #333333;
  .text-container {
    color: #9aafbc;
  }
  .img-box {
    width: 54px;
    height: 54px;
    border-radius: 8px;
    // border-radius: ;
    overflow: hidden;
  }
  p {
    margin-left: 20px;
  }
}
</style>