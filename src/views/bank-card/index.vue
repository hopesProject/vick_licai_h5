<template>
  <div>
    <van-nav-bar
      :title="$t('银行卡')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <div class="nav-bar-text">{{ $t("管理") }}</div>
      </template>
    </van-nav-bar>

    <div class="box">
      <div v-if="userInfo.bankCard" class="item-box">
        <div class="gl-type" v-if="glType" @click="shanchu">
          <svg-icon style="margin-left: 10px" iconClass="shanchu" />
        </div>

        <div class="card-box">
          <div>
            <svg-icon
              class="font-svg"
              style="margin-left: 10px"
              iconClass="xinpian"
            />
          </div>
          <p style="color: #fff" class="bank-text">{{ userInfo.bankCard }}</p>
          <div class="flex justify-between yinhangname">
            <div class="left">{{ userInfo.bankName }}</div>
            <div class="right">
              <!-- <div>Expiry Date</div>
              <div class="riqi">02/30</div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-else class="addCard" @click="$router.push('/add-bank-card')">
        <div>{{ $t("添加银行卡") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteBank } from "@/api";
import { Toast } from "vant";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      glType: false,
    };
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    async shanchu() {
      try {
        const res = await deleteBank();
        Toast(this.$t("删除成功"));
        setTimeout(() => {
          this.getUserInfo();
        }, 1500);
      } catch (error) {}
    },
    onClickRight() {
      this.glType = !this.glType;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin: 0 30px;
  .font-svg {
    font-size: 68px;
  }
  .item-box {
    margin-top: 36px;
    width: 690px;
    height: 436.77px;
    opacity: 1;
    border-radius: 40px;
    background: linear-gradient(21deg, #93278f -2%, #29abe2 67%);
    padding: 60px 50px;
    position: relative;
    .yinhangname {
      font-size: 36px;
      font-weight: normal;
      line-height: 36px;
      letter-spacing: 0px;
      margin-top: 40px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      align-items: center;
      .right {
        font-size: 24px;
        .riqi {
          margin-top: 10px;
          font-size: 36px;
        }
      }
    }
    .bank-text {
      color: #fff;
      margin-top: 60px;
      font-size: 50px;
    }
  }
  .addCard {
    margin-top: 36px;
    position: relative;
    width: 690px;
    height: 436px;
    background-image: url("@/assets/addCard.png");
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      // width: 280px;
      padding: 0 20px;
      height: 88px;
      border-radius: 119px;
      opacity: 1;
      text-align: center;
      box-sizing: border-box;
      border: 2px solid #d8d8d8;
      font-size: 36px;
      font-weight: 900;
      line-height: 88px;
      letter-spacing: 1.35px;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #ffffff;
    }
  }
}

.gl-type {
  position: absolute;
  right: 30px;
  top: 30px;
}
</style>