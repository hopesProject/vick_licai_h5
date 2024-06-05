<template>
  <div class="wrapper">
    <van-nav-bar
      title="VIP"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="content">
      <div class="content-img">
        <img src="@/assets/img/service-img.png" alt="" />
        <div class="content-title">{{ $t("服务中心") }}</div>
      </div>
      <div class="content-box">
        <div class="box-title">{{ $t("在您需要的时候一路相伴") }}</div>
      </div>
      <div
        class="box-list wx"
        @click="setRouter(serviceList.e_setting_ws_customer_service)"
      >
        <img src="@/assets/img/wx.png" alt="" />
        <div class="list-txt">
          <div>{{ $t("在线客服") }}</div>
          <div>{{ $t("在线时间 9:00至18:00") }}</div>
        </div>
        <div class="list-right">
          <img src="@/assets/img/white-arrow-right.png" alt="" />
        </div>
      </div>
      <div
        class="box-list tele"
        @click="setRouter(serviceList.e_setting_tg_customer_service)"
      >
        <img src="@/assets/img/telegram.png" alt="" />
        <div class="list-txt">
          <div>{{ $t("在线客服") }}</div>
          <div>{{ $t("在线时间 9:00至18:00") }}</div>
        </div>
        <div class="list-right">
          <img src="@/assets/img/white-arrow-right.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCustomerService } from "@/api";

export default {
  data() {
    return {
      serviceList: {},
    };
  },
  mounted() {
    this.getCustomerService();
  },
  methods: {
    setRouter(url) {
      window.open(url);
    },
    async getCustomerService() {
      try {
        const res = await getCustomerService();
        this.serviceList = res.data;
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-size: 100%;
  overflow: auto;
}

.content {
  padding: 30px 30px 0 30px;
}
.content-img {
  height: 550px;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
  }
  .content-title {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 62px;
    color: #d25815;
    font-weight: bold;
  }
}
.box-title {
  color: #3d3d3d;
  font-weight: bold;
  font-size: 46px;
  text-align: center;
  padding-top: 30px;
}
.box-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  border-radius: 50px;
  margin-top: 16px;
  > img {
    width: 88px;
    height: 88px;
  }
  .list-txt {
    display: flex;
    flex-direction: column;
    color: #091b3d;
    font-size: 32px;
    > div:nth-child(2) {
      font-size: 28px;
      color: #091b3d;
    }
  }
  .list-right {
    > img {
      width: 36px;
      height: 36px;
    }
  }
}
.wx {
  background: #3d98e7;
}
.tele {
  background: #f17f2d;
}
</style>