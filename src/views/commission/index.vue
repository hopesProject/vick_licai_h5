<template>
  <div class="wrapper">
    <van-nav-bar
      :title="$t('佣金比率')"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="content">
      <div class="header-img">
        <img src="@/assets/img/commission-bg.png" alt="" />
      </div>
      <div class="content-title">
        <span>{{ $t("邀请") }}</span>
        {{ $t("好友") }}&emsp;<span>{{ $t("分享") }}</span>
        {{ $t("现金") }}
      </div>
      <div class="commission">
        <div class="commission-title">{{ $t("提成收益") }}</div>
        <table class="commission-table" cellspacing="0">
          <tr>
            <td>{{ $t("团队成员级别") }}</td>
            <td>{{ $t("佣金比例") }}</td>
          </tr>
          <tr
            v-for="(item, index) in e_setting_first_purchase_commission"
            :key="item"
          >
            <td>
              <div class="level">
                <img src="@/assets/img/commission-icon1.png" alt="" />
                <span>{{ $t("直属会员") }} V{{ index + 1 }}</span>
              </div>
            </td>
            <td>{{ item }}%</td>
          </tr>
        </table>
      </div>
      <div class="invite">
        <div class="invite-title">{{ $t("邀请任务") }}</div>
        <div
          class="invite-list"
          v-for="(item, i) in queryPaySettingList"
          :key="i"
        >
          <img src="@/assets/img/commission-icon1.png" alt="" />
          <div class="invite-list-txt">
            <span>{{ $t("活跃会员") }}</span>
            <div class="invite-progress">
              <span
                >{{ item.payLevelTitle }}

              </span>
              <van-progress
                :percentage="(userInfo.oneCount / item.directThrustCount) * 100"
                stroke-width="8"
                :show-pivot="false"
              />
            </div>
          </div>
          <div class="invite-list-right">
            <span>{{ item.payAmount }}</span>
            <span>{{ $t("奖励") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAppSettingInfo, queryPaySetting } from "@/api";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      e_setting_first_purchase_commission: [],
      queryPaySettingList: [],
      inviteList: [
        {
          img: require("@/assets/img/commission-icon1.png"),
          percentageTxt: "10/20",
          percentage: 50,
          reward: 500,
        },
        {
          img: require("@/assets/img/commission-icon1.png"),
          percentageTxt: "5/20",
          percentage: 30,
          reward: 500,
        },
      ],
    };
  },
  mounted() {
    this.getShuoming();
    this.queryPaySetting();
  },
  methods: {
    async queryPaySetting() {
      try {
        const res = await queryPaySetting();
        this.queryPaySettingList = res.data;
      } catch (error) {}
    },
    async getShuoming() {
      try {
        const res = await getAppSettingInfo({
          key: "e_setting_first_purchase_commission",
        });
        this.e_setting_first_purchase_commission = res.data.svalue.split("/");
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f8f3f2;
}

.content {
  margin: 16px;

  .header-img {
    > img {
      height: 605px;
      width: 100%;
      border-radius: 16px;
    }
  }
}

.content-title {
  font-size: 68px;
  text-align: center;
  font-weight: 600;
  margin-top: 80px;

  > span {
    color: #d35a18;
  }
}

.commission {
  border-radius: 32px;
  background: #ffffff;
  padding: 48px 36px 36px 36px;

  .commission-title {
    font-size: 32px;
    color: #3d3d3d;
    text-align: center;
    margin-bottom: 32px;
  }

  table,
  td {
    border: 2px solid #d8d8d8;
  }

  .commission-table {
    width: 100%;
    border-collapse: separate;
    font-size: 24px;

    td {
      height: 90px;
      text-align: center;
    }
    .level {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 48px;
        height: 48px;
        margin-right: 12px;
      }
    }
  }
}
.invite {
  border-radius: 32px;
  background: #ffffff;
  padding: 48px 36px 36px 36px;
  margin-top: 32px;
  .invite-title {
    font-size: 32px;
    text-align: center;
  }
  .invite-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 44px 38px;
    box-shadow: 0px 9.62px 38.47px 0px rgba(0, 0, 0, 0.08);
    border-radius: 39px;
    margin-top: 24px;
    > img {
      width: 48px;
      height: 48px;
    }
    .invite-list-txt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      > span {
        font-size: 38px;
        color: #606574;
        font-weight: 800;
      }
      .invite-progress {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        color: #b3b3c6;
        > span {
          padding: 2px 12px 0 0;
        }
        .van-progress {
          width: 155px;
        }
      }
    }
    .invite-list-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      > span:nth-child(1) {
        font-size: 46px;
        color: #d35a18;
        font-weight: 800;
      }
      > span:nth-child(2) {
        font-size: 30px;
        color: #666666;
      }
    }
  }
}
</style>