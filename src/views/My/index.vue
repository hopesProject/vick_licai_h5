<template>
  <div class="page">
    <header>
      <van-row>
        <van-col span="16">
          <div class="phone">
            <div style="margin-right: 10px">
              {{ userInfo.phone | _phoneSubstring }}
            </div>
            <div class="vip">VIP{{ userInfo.vip }}</div>
          </div>
          <!-- <div class="Id">{{ $t("ID账号：") }}{{ userInfo.code }}</div> -->
          <div>
            {{ $t("邀请码：") }}{{ userInfo.invitationCode }}
            <span
              class="fz"
              v-clipboard:copy="userInfo.invitationCode"
              v-clipboard:success="onCopy"
              >{{ $t("复制") }}</span
            >
          </div>
        </van-col>
        <van-col span="6" class="flex flex-col items-end">
          <div class="img">
            <van-uploader
              upload-icon="https://img01.yzcdn.cn/vant/sand.jpg"
              preview-size="40px"
              :after-read="afterRead"
            />
          </div>
        </van-col>
      </van-row>
    </header>
    <main>
      <div class="main-haeder-item">
        <div class="trxt-box">
          <img :src="chzhiong" alt="" />
          <div>
            <p>
              {{ userInfo.cumulativeRechargeAmount | _toLocaleString(false) }}
            </p>
            <p class="jine">{{ $t("充值金额") }}</p>
          </div>
        </div>
        <div class="but-box" @click="$router.push('/recharge')">
          {{ $t("立即充值") }}
        </div>
      </div>

      <div class="main-haeder-item main-haeder-item1">
        <div class="trxt-box">
          <img :src="shouyi" alt="" />
          <div>
            <p>
              {{ userInfo.cumulativeWithdrawalAmount | _toLocaleString(false) }}
            </p>
            <p class="jine">{{ $t("提取金额") }}</p>
          </div>
        </div>
        <div class="but-box" @click="$router.push('/withdrawal')">
          {{ $t("立即提现") }}
        </div>
      </div>

      <div class="my-earnings">
        <div class="title-box">{{ $t("我的收益") }}</div>
        <van-row class="earning-list" type="flex" justify="space-between">
          <van-col span="12">
            <div class="list-item">
              <h3>{{ $t("累计收益") }}</h3>
              <div class="text">
                {{ userInfo.cumulativeEarnings | _toLocaleString(false) }}
              </div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="list-item list-items">
              <h3>{{ $t("累计提款") }}</h3>
              <div class="text">
                {{
                  userInfo.cumulativeWithdrawalAmount | _toLocaleString(false)
                }}
              </div>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 图层 7.png -->
      <div class="tuceng7">
        <div class="tuceng7text">标语标语标语</div>
        <div class="tuceng7text1">标语标语</div>
      </div>

      <div class="accessibility">
        <div class="title-box">{{ $t("辅助功能") }}</div>

        <van-row type="flex" justify="space-between">
          <van-col
            :class="`van-col-bg`"
            span="8"
            v-for="item in fuzhu"
            :key="item.img"
            @click="goRouter(item.router)"
          >
            <img :src="item.img" alt="" />
            <div class="span">
              {{ item.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import clipboard2 from "@/mixins/clipboard2";
import { Dialog } from "vant";
import { fileUpload } from "@/api";

export default {
  mixins: [clipboard2],

  computed: {
    ...mapGetters(["userInfo"]),
    fuzhu() {
      return [
        {
          img: require("@/assets/my-icon1.png"),
          name: this.$t("团队"),
          router: "/team",
        },
        {
          img: require("@/assets/my-icon2.png"),
          name: this.$t("VIP等级"),
          router: "/vip-list",
        },
        {
          img: require("@/assets/my-icon3.png"),
          name: this.$t("购买记录"),
          router: "/purchase-history",
        },
        {
          img: require("@/assets/my-icon4.png"),
          name: this.$t("资金详情"),
          router: "/capital",
        },
        {
          img: require("@/assets/my-icon5.png"),
          name: this.$t("收益详情"),
          router: "/earnings-record",
        },
        {
          img: require("@/assets/my-icon6.png"),
          name: this.$t("银行卡管理"),
          router: "/bank-card",
        },
        {
          img: require("@/assets/my-icon7.png"),
          name: this.$t("分享"),
          router: "/share",
        },
        {
          img: require("@/assets/my-icon8.png"),
          name: this.$t("语言"),
          router: "/lang",
        },
        {
          img: require("@/assets/my-icon9.png"),
          name: this.$t("下载"),
          router: "/download",
        },
        {
          img: require("@/assets/my-icon10.png"),
          name: this.$t("关于"),
          router: "",
        },
        {
          img: require("@/assets/dc.png"),
          name: this.$t("登出"),
          router: "dc",
        },
        {
          img: "",
          name: this.$t(""),
          router: "",
        },
      ];
    },
  },
  data() {
    return {
      chzhiong: require("@/assets/充值中心.png"),
      shouyi: require("@/assets/收益详情 拷贝 2.png"),
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["OUT_TOKEN"]),
    // 文件读取完成后触发

    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData();
      formData.append("file", file.file); // file.file 包含文件的原始数据
      console.log(formData, file);
      const res = await fileUpload({ file: formData });
    },
    goRouter(key) {
      if (key === "dc") {
        return Dialog.confirm({
          message: this.$t("是否登出？"),
          confirmButtonText: this.$t("确认"),
          cancelButtonText: this.$t("取消"),
          beforeClose: (action, done) => {
            if (action === "confirm") {
              this.OUT_TOKEN();
              done();
            } else {
              done();
            }
          },
        });
      }
      if (key) {
        this.$router.push(key);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/my-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  background-color: #fff5eb;
}

main {
  .accessibility {
    width: 685px;
    background: #ffffff;
    border-radius: 10px;
    margin: 30px auto 0;
    overflow: hidden;

    img {
      width: 45px;
    }

    .van-col-bg {
      margin-bottom: 45px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .span {
      font-size: 18px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 20px;
      margin-top: 38px;
    }

    .title-box {
      margin-top: 36px;
      margin-bottom: 27px;
      margin-left: 27px;
      padding-bottom: 20px;

      font-size: 30px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 20px;
      background-image: url("@/assets/圆角矩形 7.png");
      background-repeat: no-repeat;
      background-position: left bottom;
    }
  }

  .tuceng7 {
    width: 690px;
    height: 182px;
    margin: 0 auto;
    background-image: url("@/assets/图层 7.png");
    background-size: 100%;
    background-repeat: no-repeat;
    font-size: 36px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: 400;
    text-align: left;
    color: #ffffff;
    letter-spacing: -0.72px;
    overflow: hidden;

    .tuceng7text {
      margin-top: 35px;
      margin-left: 246px;
    }

    .tuceng7text1 {
      font-size: 26px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      letter-spacing: -0.52px;
      margin-top: 23px;
      margin-left: 302px;
    }
  }
  .my-earnings {
    width: 691px;
    height: 228px;
    background: #ffffff;
    border-radius: 10px;
    margin: 21px auto 30px;
    overflow: hidden;
    .earning-list {
      width: 580px;
      margin: 0 auto;
      font-size: 20px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
      font-weight: 400;
      text-align: center;
      color: #f6a582;
      line-height: 17px;
      letter-spacing: -0.63px;

      .list-item {
        width: 270px;
        height: 121px;
        background: #fff8e8;
        border-radius: 10px;
        background-image: url("@/assets/矢量智能对象.png");
        background-repeat: no-repeat;
        background-position: right 27px bottom 10px;
        background-size: 135px 92px;
        text-align: left;
        padding: 20px;
        line-height: 30px;

        h3 {
          margin-bottom: 17px;
        }

        .text {
          font-size: 20px;
          font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

          font-weight: 400;

          line-height: 17px;
          letter-spacing: -0.78px;
        }
      }

      .list-items {
        background: #e9faff;
        color: #319dc6;
        background-image: url("@/assets/矢量智能对象 (1).png");
        background-size: 130px 92px;
        background-repeat: no-repeat;
        background-position: right 27px bottom 10px;
      }
    }

    .title-box {
      margin-top: 27px;
      margin-bottom: 27px;
      margin-left: 27px;
      padding-bottom: 20px;

      font-size: 30px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 20px;
      background-image: url("@/assets/圆角矩形 7.png");
      background-repeat: no-repeat;
      background-position: left bottom;
    }
  }

  .main-haeder-item {
    width: 710px;
    height: 132px;
    border-radius: 40px;
    background-image: url("@/assets/main-imte1.png");
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 80px auto 0;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .but-box {
      width: 176px;

      background: #87593c;
      border-radius: 33px;
      font-size: 15px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      color: #ffead1;
      letter-spacing: -0.52px;
      margin-right: 17px;
      margin-top: 36px;
      height: 66px;
      line-height: 66px;
      text-align: center;
    }

    .trxt-box {
      width: 471px;
      height: 128px;
      background-image: url("@/assets/矩形 10.png");
      background-size: 100%;
      background-repeat: no-repeat;
      margin: 36px 0 0 28px;
      padding: 25px 0 0 38px;
      display: flex;
      font-size: 30px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      text-align: left;
      color: #333333;
      letter-spacing: -0.6px;

      p {
        line-height: 23px;

        span {
          font-size: 37px;
          font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

          font-weight: 400;
          text-align: left;
          color: #666666;
          letter-spacing: -0.75px;
        }
      }

      .jine {
        font-size: 22px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

        font-weight: normal;
        text-align: left;
        color: #999999;
        letter-spacing: -0.44px;
        margin-top: 15px;
      }

      img {
        width: 51px;
        height: 51px;
        margin-right: 25px;
      }
    }
  }

  .main-haeder-item1 {
    background-image: url("@/assets/矩形 9 (1).png");
    margin-top: 20px;

    .but-box {
      background: #ffffff;
      color: #333333;
    }
  }
}

header {
  padding: 0 30px;
  font-size: 30px;
  font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

  font-weight: normal;
  text-align: left;
  color: #ffffff;
  margin-top: 80px;

  .vip {
    width: 142px;
    line-height: 49px;
    opacity: 0.71;
    background: #f4f4f4;
    border-radius: 25px;
    text-align: center;
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%);
    font-size: 36px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: bold;
    color: #f4f4f4;
    // margin-left: 30px;
    // margin-bottom: 27px;
  }

  .img {
    margin-right: 10px;

    img {
      width: 98px;
      height: 98px;
      border-radius: 50%;
    }
  }

  .phone {
    display: flex;
    align-items: center;
    font-size: 46px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #ffffff;
    margin-bottom: 26px;
  }

  .Id {
    font-size: 24px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: 400;
    text-align: left;
    color: #ffffff;
    margin-bottom: 24px;
  }

  .fz {
    text-decoration: underline;
  }
}

:deep(.van-uploader__upload) {
  border-radius: 50%;
  overflow: hidden;
  .van-uploader__upload-icon {
    font-size: 88px;
  }
}
</style>