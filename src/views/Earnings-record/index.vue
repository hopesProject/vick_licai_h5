<template>
  <div>
    <van-nav-bar :title="$t('收益记录')" />

    <header>
      <div class="bg-header"></div>
      <img
        src="https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF"
        alt=""
      />
      <div class="id-img">
        <div class="phone">{{ userInfo.phone }}</div>
        <div>ID账号：{{ userInfo.id }}</div>
      </div>
    </header>
    <main>
      <div v-for="item in data" :key="item.id" class="item-box">
        <div class="item-header">
          <img :src="imgHeader" alt="" />
          <div class="quxshitime">
            {{ $t("创建时间") }}：{{
              item.createTime | _timeFormat("MM-DD-YYYY")
            }}
          </div>
          <div>
            {{ $t("到期时间") }}：{{ item.endTime | _timeFormat("MM-DD-YYYY") }}
          </div>
        </div>
        <div class="item-content">
          <img :src="item.img" alt="" />

          <div>
            <div class="h3">基金编号：{{ item.id }}</div>
            <div class="content-sdf">
              <div class="content">
                <div class="mb">
                  买入价格：{{ item.amount | _toLocaleString(false) }}
                </div>
                <div>总收入：$180.00</div>
              </div>
              <div class="time">
                <div class="mb">每日收入：612.00</div>
                <div>积累收入：612.00</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { productRecord } from "@/api";
import { mapGetters } from "vuex";
// userInfo
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      data: [],
      imgHeader: require("@/assets/5.png"),
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await productRecord();
      if (res.status == 0) {
        console.log(res);
        this.data = res.data.records;
      }
    },

    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 23px;
}
.item-box {
  margin: 0 auto 15px;
  width: 720px;
  background: #ffffff;
  border-radius: 22px 22px 22px 22px;
  box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);
  padding-bottom: 50px;
  background-image: url("@/assets/₹ (1).png");
  background-repeat: no-repeat;
  background-position: right 61px bottom -10px;
  .item-header {
    height: 63px;
    width: 100%;
    background-image: url("@/assets/定制横.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 50px;
    display: flex;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
    line-height: 12px;
    letter-spacing: 1px;
    align-items: center;
    .quxshitime {
      margin-right: 87px;
    }
    img {
      width: 41px;
      height: 41px;
      margin-left: 28px;
      margin-right: 70px;
    }
  }
  .item-content {
    .h3 {
      font-size: 32px;
      font-family: PingFang, PingFang-SC-Regular;
      font-weight: normal;
      text-align: left;
      color: #333333;
    }
    img {
      width: 124px;
      height: 124px;
      margin-left: 58px;
      margin-right: 22px;
    }
    display: flex;
    align-items: center;

    padding-right: 40px;
    .content-sdf {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .content {
    flex: 1;
    font-size: 26px;
    font-family: PingFang, PingFang-SC-Regular;
    font-weight: normal;
    text-align: left;
    color: #999999;

    .mb {
      margin-top: 22px;
      margin-bottom: 18px;
    }
    line-height: 24px;
  }
  .time {
    margin-left: 20px;
    .mb {
      margin-top: 22px;
      margin-bottom: 18px;
    }
    font-size: 26px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: bold;
    text-align: left;
    color: #ffb188;
    line-height: 24px;
  }
}
header {
  width: 100vw;
  height: 255px;
  font-size: 16px;
  font-family: Adobe Heiti Std, Adobe Heiti Std-R;
  font-weight: normal;
  text-align: left;
  color: #333333;
  line-height: 10px;
  background-image: url("@/assets/₹.png");
  background-repeat: no-repeat;
  background-position: right 50px top;
  background-color: #ecfafc;
  display: flex;
  padding-left: 84px;
  padding-top: 24px;
  position: relative;
  .bg-header {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("@/assets/波浪 拷贝.png");
    background-repeat: no-repeat;
    background-position: bottom left;
  }
  .id-img {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 20px;
    .phone {
      font-size: 32px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: left;
      color: #333333;
      line-height: 32px;
      margin-bottom: 27px;
    }
  }
  img {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    margin-right: 36px;
  }
}

::v-deep .van-nav-bar__content {
  background-color: #ecfafc;
}
</style>