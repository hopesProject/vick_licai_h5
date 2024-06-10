<template>
  <div style="min-height: 100vh">
    <van-nav-bar :title="$t('产品详情')" left-arrow @click-left="onClickLeft" />
    <!-- <van-image class="img-box" :src="dataDetail.img" /> -->

    <div class="main">
      <van-image
        class="img-box"
        fit="cover"
        :src="$utils.getImgUrl(dataDetail.img)"
      />
      <!-- 两端对齐 -->
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <div class="header">{{ dataDetail.productTitle }}</div>
        </van-col>
        <van-col span="12" style="text-align: right"></van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <div class="title">{{ $t("产品价格") }}</div>
          <div class="text">
            {{ dataDetail.price | _toLocaleString(false) }}
          </div>
        </van-col>
        <van-col span="12" style="text-align: right">
          <div class="title">{{ $t("每日收益") }}</div>
          <div class="text">
            {{ dataDetail.dailyProductRevenue | _toLocaleString(false) }}
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <div class="title">{{ $t("周期") }}</div>
          <div class="text">{{ dataDetail.cycle }}</div>
        </van-col>
        <van-col span="12" style="text-align: right">
          <div class="title">{{ $t("总收益") }}</div>
          <div class="text">
            {{ dataDetail.totalProductRevenue | _toLocaleString(false) }}
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <div class="title">{{ $t("限购") }}</div>
          <div class="text">
            {{ dataDetail.purchaseLimit || "Unlimited" }}
          </div>
        </van-col>
        <van-col span="12" style="text-align: right">
          <div class="title">{{ $t("限时") }}</div>
          <div class="text">
            {{ dataDetail.endTime | _timeFormat }}
          </div>
        </van-col>
      </van-row>
      <!-- <van-row type="flex" justify="space-between" class="fenke">
        <van-col span="12">
          <Progress :current="49" :total="50" text="已售%" />
        </van-col>
        <van-col span="12" class="flex justify-end">
          <svg-icon class="font-svg" iconClass="vipgm" />
          <span style="color: #fe500d">
            {{ dataDetail.vipRequest }}
          </span>
        </van-col>
      </van-row> -->
      <van-row type="flex" justify="space-between">
        <!-- <van-col span="12">
          <div class="header">{{ $t("购买") }}</div>
        </van-col> -->
        <van-col span="12" style="text-align: right"> </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" style="align-items: center">
        <van-col span="12">
          <div class="text2">{{ $t("购买数量") }}</div>
        </van-col>
        <van-col span="12" class="aklsd-input">
          <div class="number-input">
            <div @click="decrement">-</div>
            <input
              type="text"
              :value="value"
              @input="updateValue($event.target.value)"
            />
            <div @click="increment">+</div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <div class="text1">{{ $t("购买价格") }}</div>
        </van-col>
        <van-col span="12" style="text-align: right">
          <div class="text">
            {{ dataDetail.price | _toLocaleString(false) }}
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="12" class="text1"> {{ $t("总价格") }} </van-col>
        <van-col span="12" style="text-align: right">
          <div class="text">
            {{ (dataDetail.price * value) | _toLocaleString(false) }}
          </div>
        </van-col>
      </van-row>

      <van-button
        :loading="loading"
        class="ljzhf"
        @click="ljzf"
        loading-text="购买中..."
      >
        {{ $t("立即支付") }}
      </van-button>
    </div>
    <div class="cpjj">{{ $t("产品简介") }}</div>

    <div v-html="dataDetail.content" class="html-box"></div>
  </div>
</template>

<script>
import Progress from "@/components/Progress";
import { buyProduct, queryProductDetail } from "@/api";
import { Toast } from "vant";

export default {
  components: { Progress },
  data() {
    return {
      value: 1,
      dataDetail: {},
      loading: false,
    };
  },
  watch: {
    "$route.query.id"() {
      this.queryProductDetail();
    },
  },
  mounted() {
    this.queryProductDetail();
  },
  methods: {
    async ljzf() {
      this.loading = true;
      try {
        const res = await buyProduct({
          pid: this.dataDetail.id,
          num: this.value,
        });
        if (res.status === 0) {
          Toast.success(this.$t(`购买成功`));
          setTimeout(() => {
            this.$router.push("/purchase-history");
          }, 1000);
        } else if (res.status === 403) {
          console.log(res.data);

          Toast.fail(this.$t(`购买条件不足`));
          setTimeout(() => {
            this.$router.push("/ProductDetails?id=" + res.data);
          }, 1000);
        }
      } catch (error) {}

      this.loading = false;
    },
    async queryProductDetail() {
      try {
        const res = await queryProductDetail({
          id: this.$route.query.id,
        });
        this.dataDetail = res.data;
      } catch (error) {}
    },
    updateValue(newValue) {
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        this.value = parsedValue;
      } else {
        this.value = 0;
      }
    },
    increment() {
      console.log(3333);
      this.value = this.value + 1;
    },
    decrement() {
      if (this.value > 0) {
        this.value = this.value - 1;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 690px;

  opacity: 1;
  background: #ffffff;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0px 12.55px 56.45px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 18px 24px;
  .header {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.6px;

    font-variation-settings: "opsz" auto;
    color: #3d3d3d;
    margin-bottom: 22px;
  }
  .title {
    font-size: 24px;
    font-weight: normal;
    line-height: 30px;
    letter-spacing: 0.6px;

    font-variation-settings: "opsz" auto;
    color: #818197;
  }
  .text {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.6px;

    font-variation-settings: "opsz" auto;
    color: #d35a18;
    margin-bottom: 12px;
  }
  .text1 {
    font-size: 24px;
    font-weight: normal;
    line-height: 30px;
    letter-spacing: 0.6px;
    font-variation-settings: "opsz" auto;
    color: #818197;
    margin-bottom: 26px;
  }
  .text2 {
    font-size: 24px;
    font-weight: normal;
    line-height: 30px;
    letter-spacing: 0.6px;
    font-variation-settings: "opsz" auto;
    color: #818197;
    margin-bottom: 26px;
  }

  .fenke {
    margin: 48px 0;
  }
}

.number-input {
  display: flex;
  align-items: center;
  width: 280px;
  height: 60px;
  border-radius: 173px;
  opacity: 1;
  overflow: hidden;
  justify-content: space-between;
  background: #f6f6f6;
  padding: 0 38px;
  margin-bottom: 26px;
  > div {
    width: 20px;
  }
  > input {
    background: #f6f6f6;
    width: 130px;
    font-size: 36px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.6px;

    font-variation-settings: "opsz" auto;
    color: #3d3d3d;
    text-align: center;
  }
}
.input-field {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.aklsd-input {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.ljzhf {
  width: 642px;
  height: 100px;
  border-radius: 30px;
  opacity: 1;
  line-height: 100px;
  text-align: center;
  background: linear-gradient(272deg, #f44848 0%, #ff782d 104%);
  font-size: 36px;
  font-weight: 600;

  letter-spacing: 1px;

  color: #ffffff;
}
.cpjj {
  font-size: 36px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 1px;

  font-variation-settings: "opsz" auto;
  color: #3d3d3d;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 50px;
}
.img-box {
  width: 100%;
  height: 400px;
}
:deep(.html-box) {
  width: 690px;
  margin: 0 auto;
  padding-bottom: 100px;
  word-break: break-all;
  overflow-wrap: break-word;
  padding-bottom: 16px;
  p {
    word-break: break-all;
    overflow-wrap: break-word;
    font-size: 28px;
  }
}
</style>