<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col
        v-for="item in dataConfig"
        :key="item.prop"
        style="margin-bottom: 20px"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
      >
        <div class="grid-content bg-purple">
          <h3>{{ item.label }}</h3>
          <div>
            <cite v-if="item.type === 1">
              {{ 2596065 | _toLocaleString(false) }}
            </cite>
            <cite v-else-if="item.type === 2">
              {{ 2596065 }} <i class="el-icon-refresh" />
            </cite>
            <cite v-else>
              {{ 2596065 }}
            </cite>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="font-size: 12px; height: auto; line-height: 41px">
          {{ $t("七日会员/充值/提现数量") }}
        </div>
        <el-divider />
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="font-size: 12px; height: auto; line-height: 41px">
          {{ $t("七日充值/提现金额") }}
        </div>
        <el-divider />
        <div class="chart-wrapper">
          <LineChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { settingAdd } from "@/api/article";
import BarChart from "./admin/components/BarChart";
import LineChart from "./admin/components/LineChart";

export default {
  components: {
    BarChart,
    LineChart,
  },
  data() {
    return {};
  },
  mounted() {
    this.ces();
  },
  methods: {
    async ces() {
      const res = await settingAdd();
      console.log(res);
    },
  },
  computed: {
    dataConfig() {
      return [
        { label: this.$t("总充值"), prop: "a", type: 1 },
        { label: this.$t("总提现"), prop: "a", type: 1 },
        { label: this.$t("今日充值"), prop: "a", type: 1 },
        { label: this.$t("今日提现"), prop: "a", type: 1 },
        { label: this.$t("总会员数"), prop: "a" },
        { label: this.$t("总订单数"), prop: "a" },
        { label: this.$t("今日订单"), prop: "a" },
        { label: this.$t("今日首充"), prop: "a" },
        { label: this.$t("提现未达"), prop: "a", type: 1 },
        { label: this.$t("今日注册"), prop: "a" },
        { label: this.$t("有效会员"), prop: "a" },
        { label: this.$t("万能验证码"), prop: "a", type: 2 },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-purple {
  padding: 10px 15px;
  background-color: #f8f8f8;
  color: #999;
  border-radius: 2px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  h3 {
    padding-bottom: 10px;
    font-size: 12px;
  }
  cite {
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    color: #009688;
  }
  .el-icon-refresh {
    background-color: #009688;
    color: #f8f8f8;
    cursor: pointer;
    margin-left: 10px;
  }
}
.bg-purple:hover {
  background-color: #cfcfcf;
  color: #888;
}
</style>
