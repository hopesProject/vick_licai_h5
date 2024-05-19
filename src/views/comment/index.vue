<template>
  <div>
    <van-nav-bar :title="$t('')" @click-right="onClickRight">
      <template #right>
        <svg-icon class="svg-fb" icon-class="fb"></svg-icon>
      </template>
    </van-nav-bar>
    <van-image
      width="100%"
      class="bancolo-img"
      :src="require('@/assets/bancolo.png')"
    />

    <main>
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
              <van-row>
                <van-col span="12">
                  <div class="avaimg">
                    <van-image
                      round
                      width="1rem"
                      height="1rem"
                      :src="
                        item.icon
                          ? item.icon
                          : 'https://img01.yzcdn.cn/vant/cat.jpeg'
                      "
                    />
                    <div>
                      <div class="name name-box-s">{{ item.userName }}</div>
                      <div class="phone">{{ item.phone }}</div>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div
                    style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: flex-end;
                    "
                  >
                    <svg-icon
                      style="float: right"
                      class="svg-fbs"
                      icon-class="qqq"
                    >
                    </svg-icon>
                    <!-- <p class="start-box">{{ item.start.toFixed(1) }}</p> -->
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="24" class="content-item">
                  {{ $t(item.comment) }}
                </van-col>
              </van-row>
              <van-row gutter="10">
                <van-col span="8">
                  <van-image
                    v-if="item.img"
                    radius="8"
                    class="item-img"
                    :src="item.img"
                  />
                </van-col>
              </van-row>
              <van-row>
                <van-col span="12">
                  <van-rate
                    allow-half
                    void-icon="star"
                    readonly
                    color="#F4B94A"
                    void-color="#eee"
                    v-model="item.start"
                    :count="5"
                  />

                  <!-- <span style="color: #ee0b25; margin-left: 5px">{{
                    item.start
                  }}</span> -->
                </van-col>
                <van-col
                  span="12"
                  style="display: flex; justify-content: flex-end"
                >
                  <p>{{ item.createTime }}</p>
                </van-col>
              </van-row>
            </div>
          </van-cell>
          <!-- <div slot="finished"></div> -->
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import { querycomment } from "@/api";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],
  mounted() {
    // this.getList();
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await querycomment({
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
    onClickRight() {
      this.$router.push("/release");
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-hairline--bottom::after) {
  border: none;
}

.svg-fb {
  font-size: 66px;
}
.svg-fbs {
  font-size: 44px;
}
.bancolo-img {
  height: 316px;
}

main {
  .item-box {
    padding: 0 30px;
    border-bottom: 10px solid #f0f3f6;
    .avaimg {
      display: flex;
      .name {
        font-size: 28px;
        margin-left: 20px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0px;

        color: #333333;
      }
      .phone {
        margin-left: 20px;
        font-size: 24px;
        font-weight: normal;
        line-height: 36px;
        letter-spacing: 0px;

        color: #9aafbc;
        margin-top: 5px;
      }
    }
    .content-item {
      font-size: 32px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #333333;
      margin: 20px 0;
    }
    .item-img {
      width: 220px;
      height: 220px;
    }
  }
}
.start-box {
  font-size: 28px;
  font-weight: 900;

  letter-spacing: 0px;

  font-variation-settings: "opsz" auto;
  color: #efa23e;
  margin-left: 16px;
}

.name-box-s {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:deep(.van-cell::after) {
  border: none;
}
</style>