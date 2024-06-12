<template>
  <div class="page">
    <HeaderBox background="#F6F6F6" />

    <div class="name-box">
      <div class="img">
        <van-uploader
          :upload-icon="userInfo.img || require('@/assets/morentupian.png')"
          :after-read="afterRead"
        />
      </div>
      <div>
        <div class="flex text-felx">
          <span> {{ userInfo.userName }}</span>
          <span style="margin-left: 9px; color: #ff4b00; font-size: 12px">
            VIP{{ userInfo.vip }}
          </span>
        </div>
        <div class="idCode">ID:{{ userInfo.code }}</div>
      </div>
    </div>

    <main>
      <div class="my-ljsy">
        <van-row type="flex" style="width: 100%">
          <van-col span="8">
            <div class="item-box">
              <div class="name">
                {{ userInfo.cumulativeEarnings | _toLocaleString() }}
              </div>
              <div class="labe">{{ $t("累计收益") }}</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="item-box">
              <div class="name">
                {{ userInfo.cumulativeWithdrawalAmount | _toLocaleString() }}
              </div>
              <div class="labe">{{ $t("累计提现") }}</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="item-box">
              <div class="name">
                {{ userInfo.toDayBound | _toLocaleString() }}
              </div>
              <div class="labe">{{ $t("今日收益") }}</div>
            </div>
          </van-col>
        </van-row>
        <div class="border-box"></div>
        <div class="botton-box">
          <div>{{ $t("邀请码：") }}{{ userInfo.invitationCode }}</div>
          <div
            class="yqihaoyou"
            v-clipboard:copy="invitationCode"
            v-clipboard:success="onCopy"
          >
            {{ $t("邀请好友") }}
          </div>
        </div>
      </div>
      <div class="my-shouyi">
        <div class="title-h1">
          {{ $t("我的收益") }}
        </div>

        <div class="flex shouyi-item">
          <div class="item-box item-box-left">
            <div class="text">
              {{ userInfo.cumulativeRechargeAmount | _toLocaleString(false) }}
            </div>
            <div class="jifen">
              <svg-icon class="vips" icon-class="jfen" />
            </div>
            <div class="but" @click="$router.push('/recharge')">
              {{ $t("充值") }}
            </div>
          </div>
          <div class="item-box">
            <div class="text">
              {{ userInfo.cumulativeWithdrawalAmount | _toLocaleString(false) }}
            </div>
            <div class="jifen">
              <svg-icon class="vips" icon-class="jfen1" />
            </div>
            <div class="but" @click="$router.push('/withdrawal')">
              {{ $t("提现") }}
            </div>
          </div>
        </div>
      </div>
      <div class="my-fuzhu">
        <div class="title-h2">{{ $t("辅助功能") }}</div>

        <div class="fuzhugong-box">
          <van-row type="flex" style="width: 100%">
            <van-col
              span="6"
              v-for="item in fuzhu"
              :key="item.router"
              @click="$router.push(item.router)"
            >
              <div class="item-box">
                <svg-icon class="vips" :icon-class="item.icon" />
                <div class="name">{{ item.name }}</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="my-botton">
        <van-cell @click="goRouter('/download')">
          <div class="flex justify-between items-center">
            <div class="title">{{ $t("下载APP") }}</div>
            <svg-icon class="vips" icon-class="xiangyou" />
          </div>
        </van-cell>
        <van-cell @click="goRouter('dc')">
          <div class="flex justify-between items-center">
            <div class="title">{{ $t("退出登陆") }}</div>
            <svg-icon class="vips" icon-class="xiangyou" />
          </div>
        </van-cell>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import clipboard2 from "@/mixins/clipboard2";
import { Dialog, Toast } from "vant";
import axios from "axios";
import HeaderBox from "@/components/header";
import { uploadImge } from "@/api";

export default {
  mixins: [clipboard2],
  components: { HeaderBox },
  computed: {
    ...mapGetters(["userInfo"]),
    fuzhu() {
      return [
        {
          icon: "icon1",
          name: this.$t("团队"),
          router: "/team",
        },
        {
          icon: "icon3",
          name: this.$t("VIP等级"),
          router: "/vip-list",
        },
        {
          icon: "icon4",
          name: this.$t("购买记录"),
          router: "/purchase-history",
        },
        {
          icon: "icon4",
          name: this.$t("资金详情"),
          router: "/capital",
        },
        {
          icon: "icon6",
          name: this.$t("银行卡"),
          router: "/bank-card",
        },

        {
          icon: "icon7",
          name: this.$t("语言"),
          router: "/lang",
        },
        {
          icon: "icon7",
          name: this.$t("修改密码"),
          router: "/undapPassword",
        },
      ];
    },
    invitationCode() {
      return `${window.location.origin}/#/register?code=${this.userInfo.invitationCode}`;
    },
    // `${window.location.origin}/#/register?code=${this.userInfo.invitationCode}`
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
      try {
        const res = await axios.post(
          process.env.VUE_APP_BASE_APIS + "/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // res.data.data;
        await uploadImge({ img: res.data.data });
        Toast.success(this.$t(`修改头像成功`));
        this.getUserInfo();
      } catch (error) {}
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
:deep(.van-uploader__upload) {
  width: 128px;
  height: 128px;
}
.page {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  .name-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    font-size: 42.67px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0em;

    color: #121836;
    padding-left: 30px;
    .idCode {
      font-size: 22.67px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      color: #aab0ba;
      margin-top: 8px;
    }
    img {
      width: 128px;
      height: 128px;
    }
  }
}

main {
  .my-ljsy {
    width: 690px;
    // height: 208px;
    border-radius: 21.71px;
    opacity: 1;

    margin: 0 auto;
    margin-top: 24px;
    overflow: hidden;
    font-size: 28px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
    background-image: url("@/assets/my-box.png");
    background-size: 100% 100%;
    .botton-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 38px 36px 28px;
      font-size: 24px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      color: #f1f5fd;
    }
    .border-box {
      border-bottom: 1px dashed #f0f5fd;
      margin-top: 23px;
      margin-bottom: 37px;
    }
    .item-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .labe {
        font-size: 24px;
        font-weight: normal;
        line-height: normal;
        text-align: center;
        letter-spacing: 0em;

        color: #aab0ba;
        margin-top: 8px;
      }
      .name {
        margin-top: 50px;
        // text-align: center;
      }
    }
  }
  .my-shouyi {
    width: 690px;
    // height: 356.62px;
    border-radius: 21.71px;
    opacity: 1;

    background: #ffffff;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    .title-h1 {
      font-size: 32px;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0em;

      color: #121836;
      margin: 32px 28px 24px;
    }
    .shouyi-item {
      justify-content: space-between;
      padding: 0 28px;
      margin-bottom: 34px;
    }
    .item-box {
      width: 300px;
      height: 160px;
      border-radius: 21.33px;
      opacity: 1;
      /* 智学100/主色/背景色 */
      background: #fafafe;
      position: relative;
      display: flex;
      align-items: center;
      .text {
        margin-top: 10px;
        font-size: 28px;
        font-weight: bold;
        line-height: normal;
        letter-spacing: 0em;

        color: #121836;
        margin-left: 44px;
      }
      .jifen {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 68px;
        height: 53.33px;
        line-height: 53.33px;
        text-align: center;
        border-radius: 21.33px 0px 21.33px 10.67px;
        opacity: 1;

        background: linear-gradient(226deg, #86ff8c 16%, #3bb64f 74%);
      }
      .but {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 116px;
        height: 45px;
        border-radius: 21.33px 0px 21.33px 10.67px;
        opacity: 1;
        font-size: 18px;
        font-weight: bold;
        line-height: 45px;
        letter-spacing: 0em;

        font-feature-settings: "kern" on;
        color: #fafafe;
        text-align: center;
        background: linear-gradient(245deg, #86ff8c 16%, #3bb64f 69%);
      }
    }
    .item-box-left {
      .vips {
        font-size: 28px;
      }
      .jifen {
        background: linear-gradient(226deg, #ffae86 16%, #ff7d67 74%);
      }
      .but {
        background: linear-gradient(245deg, #ffae86 14%, #ff7d67 69%);
        color: #3d3d3d;
      }
    }
  }

  .my-fuzhu {
    width: 690px;
    height: 356.62px;
    border-radius: 21.71px;
    opacity: 1;
    background: #ffffff;
    padding: 28px;
    margin: 0 auto;
    margin-top: 24px;
    .fuzhugong-box {
      display: flex;
      width: 100%;
      margin-top: 37px;
      .item-box {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 20px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        color: #121836;
        margin-bottom: 27px;
        .name {
          text-align: center;
        }
        .vips {
          font-size: 44px;
          margin-bottom: 16px;
        }
      }
    }
    .title-h2 {
      font-size: 32px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      color: #121836;
    }
  }

  .my-botton {
    width: 690px;
    // height: 208px;
    border-radius: 21.71px;
    opacity: 1;
    background: #ffffff;
    margin: 0 auto;
    margin-top: 24px;
    overflow: hidden;
    .title {
      font-size: 28px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      color: #121836;
    }
  }

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
      width: 230px;
      text-align: center;
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
    font-size: 162px;
  }
}

:deep(.van-cell) {
  padding: 32px;
}

.yqihaoyou {
  width: 144px;
  height: 48px;
  border-radius: 26.67px;
  opacity: 1;

  background: #f0f5fe;
  font-size: 24px;
  font-weight: normal;
  line-height: 48px;
  letter-spacing: 0em;

  color: #d25815;
  box-shadow: 2.67px 2.67px 10.67px 0px rgba(0, 11, 222, 0.24);
}

.text-felx {
  // align-items: flex-end;
  align-items: center;
}
</style>