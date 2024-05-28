<template>
  <div>
    <van-nav-bar :title="$t('银行卡')" left-arrow @click-left="onClickLeft" />

    <div class="box">
      <div v-if="userInfo.bankCard" class="item-box">
        <div class="card-box">
          <p>{{ $t("银行卡号：") }}{{ userInfo.bankCard }}</p>
          <p>{{ $t("IFSC：") }}{{ userInfo.ifsc }}</p>
          <p>{{ $t("银行卡名称：") }}{{ userInfo.bankName }}</p>
        </div>
      </div>
      <img
        v-else
        src="@/assets/addbank.png"
        alt=""
        @click="$router.push('/add-bank-card')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-box {
  margin: 0 auto;
  width: 662px;
  height: 238px;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #ffba8c;
  margin-bottom: 35px;
  background-image: url("@/assets/visa.png");
  background-size: 84px 29px;
  background-repeat: no-repeat;
  background-position: left 38px bottom 63px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 30px;
  // font-family: SourceHanSansSC, SourceHanSansSC-Normal;
  font-weight: normal;
  text-align: left;
  color: #ffffff;
  padding-right: 50px;
}

.item-box1 {
  background: linear-gradient(-32deg, #74ae8b 0%, #81c29a 99%);
}

.item-box2 {
  background: linear-gradient(-32deg, #5c81c1 0%, #89b4e6 99%);
}

.box {
  position: relative;
  height: calc(100vh - 1.33333rem);

  > img {
    width: 118px;
    height: 118px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>